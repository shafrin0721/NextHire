export const ContactHeroSection = (): JSX.Element => {
  return (
    <section className="relative bg-[linear-gradient(135deg,rgba(37,99,235,1)_0%,rgba(59,130,246,1)_50%,rgba(96,165,250,1)_100%)] py-20">
      <div className="absolute inset-0 bg-[#0000001a]" />
      <div className="relative container mx-auto px-4 max-w-[960px] text-center">
        <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-5xl md:text-6xl tracking-[-0.50px] leading-tight mb-4">
          Get In Touch
        </h1>
        <p className="[font-family:'Inter',Helvetica] font-normal text-blue-100 text-lg md:text-xl tracking-[-0.50px] leading-7">
          Have questions? We&apos;d love to hear from you. Send us a message and
          we&apos;ll respond as soon as possible.
        </p>
      </div>
    </section>
  );
};

