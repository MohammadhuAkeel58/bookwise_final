import Image from "next/image";

export default function Home() {
  const services = [
    {
      title: "Quarterly Reports",
      description:
        "The3Key reviews your opportunities and risks, while educating you on your taxes and business position.",
      icon: "box",
    },
    {
      title: "Annual Accounts",
      description:
        "Annual Accounts and Corporation Tax for UK creatives. We avoid deadlines and inaccuracies.",
      icon: "roller",
    },
    {
      title: "Self Assessment",
      description:
        "We don't forget the details often overlooked, leaving the Tax Man with nothing to question.",
      icon: "mail",
    },
    {
      title: "VAT",
      description:
        "VAT support that keeps you compliant while protecting margins and reducing surprises.",
      icon: "grid",
    },
  ];

  const renderIcon = (icon: string) => {
    if (icon === "box") {
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-[#f6f1df]" fill="none">
          <path d="M25 45L60 28L95 45L60 62L25 45Z" stroke="currentColor" strokeWidth="5" />
          <path d="M25 45V80L60 97V62" stroke="currentColor" strokeWidth="5" />
          <path d="M95 45V80L60 97" stroke="currentColor" strokeWidth="5" />
          <circle cx="68" cy="74" r="8" fill="currentColor" />
        </svg>
      );
    }

    if (icon === "roller") {
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-[#f6f1df]" fill="none">
          <rect x="16" y="30" width="72" height="24" rx="8" stroke="currentColor" strokeWidth="5" />
          <path d="M88 42H104" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M76 56L82 100" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M82 100C76 92 76 86 82 80C88 74 88 68 82 62" stroke="currentColor" strokeWidth="5" />
        </svg>
      );
    }

    if (icon === "mail") {
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-[#f6f1df]" fill="none">
          <path d="M20 78L72 92L84 44L32 30L20 78Z" stroke="currentColor" strokeWidth="5" />
          <path d="M32 30L60 56L84 44" stroke="currentColor" strokeWidth="5" />
          <path d="M58 24L88 54L68 80L38 50L58 24Z" stroke="currentColor" strokeWidth="5" />
          <circle cx="61" cy="52" r="5" fill="currentColor" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 text-[#f6f1df]" fill="none">
        <rect x="18" y="18" width="84" height="84" stroke="currentColor" strokeWidth="5" />
        <path d="M18 50H102M18 72H102M50 18V102M72 18V102" stroke="currentColor" strokeWidth="5" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#fff9e8] text-[#1d1c11] font-body antialiased flex flex-col pt-20 md:pt-24">
      <nav className="fixed top-0 w-full z-[100] px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6">
        <div className="flex justify-between items-center gap-4 w-full max-w-screen-2xl mx-auto">
          <a
            className="text-2xl md:text-3xl font-black font-headline tracking-tighter text-primary bg-white px-3 md:px-4 py-1 -rotate-2 border-2 border-black"
            href="#"
          >
            Bookwise
          </a>
          <div className="hidden lg:flex items-center gap-10 font-body text-sm font-normal uppercase rotate-1">
            <a className="hover:line-through decoration-4 underline-offset-4" href="#">
              Process
            </a>
            <a className="hover:line-through decoration-4" href="#">
              Solutions
            </a>
            <a className="hover:line-through decoration-4" href="#">
              Pricing
            </a>
            <a className="hover:line-through decoration-4" href="#">
              About
            </a>
          </div>
          <button className="hidden md:block px-4 md:px-5 lg:px-8 py-2 md:py-2.5 lg:py-3 text-xs md:text-sm lg:text-base bg-primary text-white font-body font-normal uppercase tracking-wider lg:tracking-widest -rotate-2 border-b-4 border-r-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-b-0 hover:border-r-0 transition-all whitespace-nowrap">
            Talk to us
          </button>
        </div>
      </nav>

      <main className="flex-grow pb-12 md:pb-16 overflow-x-hidden">
        <section className="relative w-full min-h-[calc(100svh+2rem)] md:min-h-[calc(100svh+3rem)] py-3 md:py-6 lg:py-8 flex items-start">
          <div className="absolute -right-8 lg:-right-16 top-1/2 -translate-y-1/2 w-1/2 lg:w-[650px] h-[850px] z-0 pointer-events-none opacity-40 lg:opacity-100">
            <div className="relative w-full h-full rotate-1">
              <div className="tape-effect top-12 left-8 lg:left-12 opacity-60" />
              <div className="tape-effect bottom-40 right-24 rotate-[35deg] opacity-60" />
              <Image
                alt="Professional accountant illustration"
                className="w-full h-full object-cover object-right grayscale contrast-150 border-[12px] border-white shadow-2xl clip-jagged"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMYZn-gBXWxh9_nxLUqlT5suBPJC2cb-9-77ABfLUHpkZBbup8zCzKcgSMubu4U9rvHUScy1ErhQfEevrMOC55h3p8HY_XOfzcjK625O4XiYNPZt97u_-2HI5HCcLS50G5LTxwG79TEuIkLbeMa7mDERQS2kR4yXEBbsayNSqcT-8LM5-zW_ttjvo3nDgcvwd8XHXU3H3_wO-meR3wcZ_J9wQ5KdUrjnw66Jp_TqbJ7t_8KajRAp_GW7JkFnvPefNerJxKOZ7FS3s"
                width={900}
                height={1200}
                priority
              />
            </div>
          </div>

          <div className="w-full px-4 md:px-10 lg:px-16 max-w-screen-2xl mx-auto relative z-10">
            <div className="max-w-4xl">
              <div className="flex flex-col items-start gap-2 mb-4 md:mb-6 lg:mb-8">
                <div className="label-box bg-white -rotate-1">
                  <h1 className="font-headline text-display-massive text-on-surface uppercase">
                    Accounting
                  </h1>
                </div>
                <div className="label-box bg-primary rotate-1 -mt-2 lg:-mt-4 ml-6 lg:ml-16">
                  <h1 className="font-headline text-display-massive text-white uppercase">
                    for the
                  </h1>
                </div>
                <div className="label-box bg-white -rotate-1 -mt-2 lg:-mt-4 ml-2 lg:ml-4">
                  <h1 className="font-headline text-display-massive text-on-surface uppercase">
                    Modern
                  </h1>
                </div>
                <div className="label-box bg-primary rotate-1 -mt-2 lg:-mt-4 ml-10 lg:ml-24">
                  <h1 className="font-headline text-display-massive text-white uppercase">
                    Entrepreneur.
                  </h1>
                </div>
              </div>

              <div className="relative z-20">
                <div className="hidden sm:block absolute -left-4 top-0 w-1 h-full bg-primary/20" />
                <p className="font-body text-base sm:text-lg md:text-xl text-on-surface max-w-lg mb-5 md:mb-6 pl-0 sm:pl-8 rotate-[-0.5deg] stamped opacity-90 leading-snug">
                  Precise, professional, and built for your growth. We turn numbers into narratives so you can focus on building your empire.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-8 items-center pl-0 sm:pl-8 w-full sm:w-auto">
                  <button className="relative z-30 w-full sm:w-auto font-body text-lg sm:text-xl font-normal bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rotate-[-2deg] border-2 border-black hover:rotate-0 transition-transform shadow-[6px_6px_0px_rgba(0,0,0,1)] stamped">
                    TALK TO US
                  </button>
                  <button className="relative z-30 w-full sm:w-auto font-body text-base sm:text-lg font-normal text-primary border-4 border-primary px-6 sm:px-7 py-2.5 sm:py-3.5 rotate-[1.5deg] hover:bg-primary/5 transition-colors shadow-[-4px_4px_0px_rgba(0,64,168,0.2)] bg-background/50 backdrop-blur-sm stamped">
                    VIEW PRICING
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full mb-10 md:mb-14">
          <video
            className="w-full h-[30vh] md:h-[36vh] lg:h-[42vh] object-cover border-y-2 border-black"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/bookwise_r.mp4" type="video/mp4" />
          </video>
        </section>

        <div className="w-full px-4 md:px-10 lg:px-16 max-w-screen-2xl mx-auto flex flex-col gap-14 md:gap-20">
          <section className="flex flex-col gap-8">
            <div className="flex items-start justify-between w-full flex-col lg:flex-row gap-10 lg:gap-20">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[#1d1c11] uppercase max-w-4xl">
                    We handle more than the tax man can throw
                  </h1>
                  <h2 className="font-headline font-bold text-xl md:text-3xl text-primary tracking-tight mt-4 uppercase">
                    You become financially resilient
                  </h2>
                </div>
              </div>
              <div className="lg:w-[36%] flex flex-col justify-end pt-2 lg:pt-16">
                <p className="text-[#434653] text-base md:text-lg leading-relaxed max-w-xl">
                  Onboarding. Quarterly Reports. Annual Accounts &amp; Corporation Tax. VAT. Payroll &amp; Pensions. Self Assessment. Bookwise plans every move before the Tax Man can.
                </p>
              </div>
            </div>
          </section>

          <section className="relative w-full">
            <div className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1d1c11] shadow-lg border border-black/10">
              <span className="text-xl">‹</span>
            </div>
            <div className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1d1c11] shadow-lg border border-black/10">
              <span className="text-xl">›</span>
            </div>

            <div className="flex gap-5 md:gap-7 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  style={{ animationDelay: `${index * 120}ms` }}
                  className="group animate-service-card snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[44vw] lg:w-[31vw] min-h-[330px] rounded-xl bg-[#1f3f8a] text-[#f6f1df] p-7 md:p-9 flex flex-col"
                >
                  <div className="mb-8 transition-transform duration-300 ease-out group-hover:rotate-2">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="font-headline font-bold text-2xl md:text-3xl leading-[0.95] uppercase mb-4">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-[#f6f1df]/95 max-w-[38ch]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#e8e2d1] w-full px-4 md:px-8 py-10 md:py-12 flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="text-xl font-black text-[#002c78] font-headline uppercase">
          Bookwise
        </div>
        <div className="uppercase tracking-widest text-[10px] text-[#1d1c11] text-center">
          © 2024 Bookwise Architectural Accounting. All rights reserved.
        </div>
        <nav className="flex gap-6">
          <a className="text-[#1d1c11] hover:opacity-80 uppercase tracking-widest text-[10px]" href="#">
            Privacy
          </a>
          <a className="text-[#1d1c11] hover:opacity-80 uppercase tracking-widest text-[10px]" href="#">
            Terms
          </a>
          <a className="text-[#1d1c11] hover:opacity-80 uppercase tracking-widest text-[10px]" href="#">
            Compliance
          </a>
        </nav>
      </footer>
    </div>
  );
}
