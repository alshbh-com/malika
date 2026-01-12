import { Heart } from "lucide-react";

interface SharedFeelingsSectionProps {
  isVisible: boolean;
}

const SharedFeelingsSection = ({ isVisible }: SharedFeelingsSectionProps) => {
  const feelings = [
    "لما بشوفك، بحس إن الدنيا كلها حلوة.",
    "صوتك بيهديني حتى في أصعب الأوقات.",
    "وجودك في حياتي أحلى هدية.",
  ];

  return (
    <section className="section-container bg-background">
      <div className="max-w-lg mx-auto text-center">
        <h2 className={`section-heading text-foreground transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Heart className="w-5 h-5 inline-block ml-2 text-primary fill-primary/50" />
          اللي قلبي حاسسه
        </h2>

        <div className="space-y-8 mt-10">
          {feelings.map((feeling, index) => (
            <p
              key={index}
              className="emotional-text transition-all duration-700"
              style={{
                transitionDelay: `${(index + 1) * 200}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              "{feeling}"
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedFeelingsSection;
