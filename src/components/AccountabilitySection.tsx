interface AccountabilitySectionProps {
  isVisible: boolean;
}

const AccountabilitySection = ({ isVisible }: AccountabilitySectionProps) => {
  return (
    <section className="section-container bg-background">
      <div className={`message-card transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Small decorative element */}
        <div className="w-12 h-px bg-primary/40 mb-8" />

        {/* Accountability message */}
        <div className="space-y-6">
          <p className="body-text">
            Malika,
          </p>
          
          <p className="body-text">
            I wasn't present in the ways that mattered. When you needed me to 
            listen, I spoke. When you needed patience, I rushed. When you 
            needed understanding, I chose assumptions.
          </p>
          
          <p className="body-text">
            That's on me. Not on circumstances. Not on timing. On me.
          </p>
          
          <p className="body-text">
            I'm not here to explain or justify. Just to acknowledge what 
            I should have acknowledged long ago.
          </p>
        </div>

        {/* Decorative end element */}
        <div className="w-8 h-px bg-primary/30 mt-8 ml-auto" />
      </div>
    </section>
  );
};

export default AccountabilitySection;
