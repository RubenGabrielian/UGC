"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Building2, Calendar } from "lucide-react";

interface Lead {
  id: string;
  brand_name: string;
  brand_email: string; // Updated to match database column name
  requested_service: string; // Updated to match database column name (NOT NULL)
  message: string | null;
  created_at: string;
}

export function Leads({ userId }: { userId: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("creator_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        setIsLoading(false);
        return;
      }

      setLeads(data || []);
      setIsLoading(false);
    }

    fetchLeads();
  }, [userId]);

  if (isLoading) {
    return (
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-zinc-500">Loading leads...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (leads.length === 0) {
    return (
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="h-12 w-12 text-zinc-300 mb-4" />
            <p className="text-sm font-medium text-zinc-900">No leads yet</p>
            <p className="text-xs text-zinc-500 mt-1">
              Brand inquiries will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-zinc-200 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-zinc-900">Leads</CardTitle>
            <div className="text-xs text-zinc-500">
              {leads.length} {leads.length === 1 ? "lead" : "leads"}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                      <Building2 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 mb-1">
                        {lead.brand_name}
                      </p>
                      <a
                        href={`mailto:${lead.brand_email}`}
                        className="text-xs text-zinc-600 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        {lead.brand_email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 ml-4">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                {lead.requested_service && (
                  <div className="mb-3">
                    <span className="text-xs font-medium text-zinc-500">
                      Requested Service:
                    </span>
                    <span className="ml-2 text-xs font-semibold text-zinc-900">
                      {lead.requested_service}
                    </span>
                  </div>
                )}
                {lead.message && (
                  <div className="mt-3 rounded-md bg-zinc-50 border border-zinc-100 p-3">
                    <p className="text-xs leading-relaxed text-zinc-700 whitespace-pre-wrap">
                      {lead.message}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

