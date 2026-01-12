interface SharedFeelingsSectionProps {
  isVisible: boolean;
}

const SharedFeelingsSection = ({ isVisible }: SharedFeelingsSectionProps) => {
  const feelings = [
    "The silence between us grew louder than any words we ever shared.",
    "I replayed conversations, wishing I'd heard what you were really saying.",
    "Distance taught me what presence should have.",
  ];

  return (
    <section className="section-container bg-secondary/20">
      <div className="max-w-lg mx-auto text-center">
        <h2 className={`section-heading text-foreground transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          What stayed with me
        </h2>

        <div className="space-y-8 mt-10">
          {feelings.map((feeling, index) => (
            <p
              key={index}
              className={`emotional-text transition-all duration-700`}
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
