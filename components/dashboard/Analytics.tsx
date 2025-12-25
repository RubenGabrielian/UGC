"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart3, TrendingUp, Eye } from "lucide-react";

interface PageViewData {
  date: string;
  views: number;
}

interface AnalyticsData {
  last7Days: PageViewData[];
  totalViews: number;
  viewsThisWeek: number;
}

export function Analytics({ userId }: { userId: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const supabase = createClient();
      
      try {
        // Get last 7 days of data
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const { data: pageViews, error } = await supabase
          .from("page_views")
          .select("viewed_at, view_count")
          .eq("creator_id", userId)
          .gte("viewed_at", sevenDaysAgo.toISOString())
          .order("viewed_at", { ascending: true });

        if (error) {
          // Log the full error object to see its structure
          console.error("Error fetching page views:", error);
          console.error("Error type:", typeof error);
          console.error("Error keys:", Object.keys(error));
          console.error("Error stringified:", JSON.stringify(error, null, 2));
          
          const errorMessage = error.message || String(error) || "Unknown error";
          const errorCode = error.code || (typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : undefined);
          
          // Check if it's a table not found error
          if (errorCode === "42P01" || errorMessage.includes("does not exist") || errorMessage.includes("relation") && errorMessage.includes("does not exist")) {
            setError("The page_views table is not set up yet. Please create the table and RPC function in your Supabase database.");
          } else if (errorCode === "42501" || errorMessage.includes("permission denied") || errorMessage.includes("RLS")) {
            setError("Permission denied. Please check your Row Level Security (RLS) policies for the page_views table.");
          } else {
            setError(`Error loading analytics: ${errorMessage}`);
          }
          
          // Set empty data on error so UI can show "no data" state
          setData({
            last7Days: [],
            totalViews: 0,
            viewsThisWeek: 0,
          });
          setIsLoading(false);
          return;
        }
        
        // Clear any previous errors on success
        setError(null);

        // Get total lifetime views
        const { data: allViews, error: totalError } = await supabase
          .from("page_views")
          .select("view_count")
          .eq("creator_id", userId);

        if (totalError) {
          console.error("Error fetching total views:", {
            message: totalError.message,
            details: totalError.details,
            hint: totalError.hint,
            code: totalError.code,
            fullError: totalError,
          });
        }

      // Process data: fill in missing dates with 0 views
      const last7DaysData: PageViewData[] = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        
        // Find views for this date (viewed_at might be a timestamp, so extract date part)
        const dayData = pageViews?.find((pv) => {
          if (!pv.viewed_at) return false;
          const viewedDate = new Date(pv.viewed_at).toISOString().split("T")[0];
          return viewedDate === dateStr;
        });
        
        last7DaysData.push({
          date: dateStr,
          views: dayData?.view_count || 0,
        });
      }

      // Calculate totals
      const totalViews = allViews?.reduce((sum, pv) => sum + (pv.view_count || 0), 0) || 0;
      const viewsThisWeek = last7DaysData.reduce((sum, day) => sum + day.views, 0);

        setData({
          last7Days: last7DaysData,
          totalViews,
          viewsThisWeek,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Unexpected error in fetchAnalytics:", err);
        setData({
          last7Days: [],
          totalViews: 0,
          viewsThisWeek: 0,
        });
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [userId]);

  if (isLoading) {
    return (
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Analytics</CardTitle>
          <CardDescription>Loading your page view analytics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-sm text-zinc-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasData = data && (data.totalViews > 0 || data.viewsThisWeek > 0);

  // Format date for display (e.g., "Jan 15")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-100 rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Analytics</CardTitle>
              <CardDescription>Track your profile performance and page views.</CardDescription>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Make sure the <code className="px-1 py-0.5 bg-background rounded text-xs">page_views</code> table exists and the <code className="px-1 py-0.5 bg-background rounded text-xs">increment_page_view</code> RPC function is set up.
              </p>
            </div>
          )}
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-zinc-100 rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Total Views</p>
                    <p className="text-2xl font-bold mt-1 font-mono text-zinc-900">{data?.totalViews.toLocaleString() || 0}</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Lifetime</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Views This Week</p>
                    <p className="text-2xl font-bold mt-1 font-mono text-zinc-900">{data?.viewsThisWeek.toLocaleString() || 0}</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Last 7 days</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card className="border-zinc-100 rounded-xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Page Views (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data?.last7Days || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#18181b" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fontSize: 11, fill: "#71717a", fontFamily: "monospace" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#71717a", fontFamily: "monospace" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e4e4e7",
                          borderRadius: "6px",
                          padding: "8px 12px",
                          fontFamily: "monospace",
                          fontSize: "12px",
                        }}
                        labelFormatter={(value) => formatDate(value)}
                        formatter={(value: number | undefined) => [value ?? 0, "Views"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#18181b"
                        strokeWidth={1.5}
                        fill="url(#colorViews)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 w-full flex flex-col items-center justify-center border border-dashed border-zinc-100 rounded-xl rounded-lg">
                  <BarChart3 className="h-12 w-12 text-zinc-300 mb-3" />
                  <p className="text-sm font-medium text-zinc-500">No data yet</p>
                  <p className="text-xs text-zinc-400 mt-1">Your page views will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
