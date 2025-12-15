import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, PlayCircle, DollarSign, Check, Sparkles } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CreatorKit</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Հնարավորություններ
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Գնացուցակ
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              ՀՏՀ
            </a>
          </div>
          <div className="hidden md:block">
            <AuthButton size="lg" />
          </div>
          <div className="md:hidden">
            <AuthButton size="sm" />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Դադարեք բրենդերին տգեղ PDF մեդիա փաթեթներ ուղարկել։
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Ստեղծեք պրոֆեսիոնալ, կենդանի թվային պորտֆոլիո, որը ցույց է տալիս ձեր լավագույն TikTok-ներն ու Reels-երը,
            վիճակագրությունը և սակագները։ Փակեք ավելի շատ գործարքներ, ավելի արագ։
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AuthButton size="lg" variant="default" className="w-full sm:w-auto" />
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Դիտել օրինակ քիթ
            </Button>
          </div>
          <div className="mt-16">
            <div className="mx-auto aspect-video max-w-5xl overflow-hidden rounded-lg border bg-muted shadow-2xl">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <img src="https://ph-files.imgix.net/052cb503-cfee-4a5c-9c1e-f055b6e8d599.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=619&fit=max&frame=1&dpr=2" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Վստահելի է ստեղծողների կողմից, որոնք աշխատում են առաջատար բրենդերի հետ։
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-40">
            <div className="text-sm font-semibold">Բրենդ 1</div>
            <div className="text-sm font-semibold">Բրենդ 2</div>
            <div className="text-sm font-semibold">Բրենդ 3</div>
            <div className="text-sm font-semibold">Բրենդ 4</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ինչու են սովորական «link-in-bio» գործիքները քիչ pitched անելու համար։
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Թվացեք ինչպես պրոֆեսիոնալ</h3>
            <p className="text-muted-foreground">
              Մոռացեք Google Drive հղումների մասին։ Ուղարկեք անհատական հասցե, որը անմիջապես տպավորում է բրենդ մենեջերներին։
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Տեղադրեք ձեր լավագույն տեսանյութերը</h3>
            <p className="text-muted-foreground">
              Պարզապես պրոֆիլի հղում ավելացնելու փոխարեն ցուցադրեք ձեր ամենաարդյունավետ Reels-երն ու TikTok-ները հենց էջում։
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Թափանցիկ սակագներ</h3>
            <p className="text-muted-foreground">
              Ցույց տվեք ձեր ծառայությունների փաթեթները, որպեսզի բրենդերը հստակ իմանան, թե ինչի համար են վճարում։
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Ինչպես է աշխատում
          </h2>
          <div className="mt-16 space-y-12">
            <div className="flex gap-6">
              <div className="flex shrink-0">
                <Badge variant="default" className="h-10 w-10 items-center justify-center rounded-full p-0 text-base font-semibold">
                  1
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Կապեք ձեր սոցիալական էջերը և ներմուծեք վիճակագրությունը</h3>
                <p className="mt-2 text-muted-foreground">
                  Կապեք ձեր TikTok և Instagram հաշիվները։ Մենք ավտոմատ վերցնում ենք ձեր հետևորդների քանակը, ներգրավվածության
                  ցուցանիշները և լավագույն բովանդակությունը։
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex shrink-0">
                <Badge variant="default" className="h-10 w-10 items-center justify-center rounded-full p-0 text-base font-semibold">
                  2
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Ընտրեք ձեր լավագույն տեսանյութերի օրինակները</h3>
                <p className="mt-2 text-muted-foreground">
                  Ընտրեք, թե որ TikTok-ներն ու Reels-երը ցույց տալ։ Փոխեք հերթականությունը, ավելացրեք նկարագրություններ
                  և առանձնացրեք լավագույն աշխատանքները։
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex shrink-0">
                <Badge variant="default" className="h-10 w-10 items-center justify-center rounded-full p-0 text-base font-semibold">
                  3
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Կիսվեք ձեր անհատական CreatorKit հղումով</h3>
                <p className="mt-2 text-muted-foreground">
                  Ստացեք ձեր եզակի հասցեն (օր․ creatorkit.com/yourname) և սկսեք այն օգտագործել ձեր pitched նամակներում։ Դիտեք, թե
                  ինչպես է բարձրանում դիմումների պատասխանների տոկոսը։
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Պարզ սակագներ, որոնք մեկ գործարքով արդարացնում են ինքն իրենց։
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Սկզբնական</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">1 մեդիա քիթ</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Հիմնական վիճակագրություն</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">&quot;Powered by CreatorKit&quot; նշում</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Սկսել անվճար
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary/50 ring-2 ring-primary/20">
            <CardHeader>
              <div className="mb-2">
                <Badge variant="default" className="mb-2">Ամենահանրաճանաչ</Badge>
              </div>
              <CardTitle>Պրո ստեղծող</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">$12</span>
                <span className="text-muted-foreground">/mo</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Անսահմանափակ տեսանյութեր</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Առանց CreatorKit նշման</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Անհատական դոմեյնի աջակցություն</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Վիճակագրություն</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Դառնալ Պրո
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Հաճախ տրվող հարցեր
          </h2>
          <div className="mt-16">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Պե՞տք են ծրագրավորման հմտություններ</AccordionTrigger>
                <AccordionContent>
                  Իհարկե ոչ։ CreatorKit-ը ստեղծված է ստեղծողների, ոչ թե ծրագրավորողների համար։ Մեր պարզ ինտերֆեյսը թույլ է տալիս
                  մի քանի րոպեում կառուցել մեդիա քիթ․ պարզապես կապեք սոցիալական հաշիվները, ընտրեք տեսանյութերը, և պատրաստ է։
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Կարո՞ղ եմ TikTok-ը միացնել</AccordionTrigger>
                <AccordionContent>
                  Այո։ CreatorKit-ը աջակցում է թե՛ TikTok, թե՛ Instagram։ Պարզապես միացրեք ձեր հաշիվները՝
                  և մենք ավտոմատ կ ներմուծենք վիճակագրությունը և լավագույն բովանդակությունը։
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Կա՞ անվճար տարբերակ</AccordionTrigger>
                <AccordionContent>
                  Մեր Starter փաթեթը լիովին անվճար է միշտ։ Կարող եք ստեղծել մեկ մեդիա քիթ հիմնական հնարավորություններով
                  առանց որևէ վճարի։ Եթե ցանկանում եք հանել բրենդավորումը, ավելացնել անսահմանափակ տեսանյութեր կամ օգտագործել
                  անհատական դոմեյն, ցանկացած պահին կարող եք անցնել Pro Creator փաթեթի։
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Ինչպե՞ս են բրենդերը տեսնում իմ մեդիա քիթը</AccordionTrigger>
                <AccordionContent>
                  Դուք կստանաք եզակի հղում (օրինակ՝ creatorkit.com/yourname), որը կարող եք ուղարկել էլ․ նամակներով,
                  սոցիալական ցանցերով կամ ցանկացած այլ եղանակով։ Այն գեղեցիկ է երևում ինչպես համակարգչում, այնպես էլ
                  հեռախոսում, որտեղ էլ հիմնականում դիտում են բրենդ մենեջերները։
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Պատրա՞ստ եք բարձրացնել ձեր pitched-երի մակարդակը։
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Միացեք հազարավոր ստեղծողների, ովքեր պրոֆեսիոնալ մեդիա քիթերի շնորհիվ ավելացնում են իրենց գործարքները։
          </p>
          <div className="mt-8">
            <AuthButton size="lg" variant="default" className="w-full sm:w-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}
