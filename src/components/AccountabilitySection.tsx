import { Heart } from "lucide-react";

interface AccountabilitySectionProps {
  isVisible: boolean;
}

const AccountabilitySection = ({ isVisible }: AccountabilitySectionProps) => {
  return (
    <section className="section-container bg-background">
      <div className={`message-card transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Small decorative element */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-px bg-primary/40" />
          <Heart className="w-4 h-4 text-primary fill-primary/30" />
        </div>

        {/* Love message */}
        <div className="space-y-6">
          <p className="body-text text-lg">
            مليكة يا أجمل اسم،
          </p>
          
          <p className="body-text">
            من يوم ما عرفتك وحياتي اتغيرت. بقيتِ الضحكة اللي بستناها، 
            والصوت اللي بريّح قلبي، والوجه اللي بشوف فيه كل حاجة حلوة.
          </p>
          
          <p className="body-text">
            انتِ مش بس حبيبتي... انتِ الأمان، الفرحة، والبيت اللي قلبي بيرتاح فيه.
          </p>
          
          <p className="body-text">
            بحبك بطريقة مش عارف أوصفها بكلام عادي. 
            بحبك بكل تفصيلة فيكِ.
          </p>
        </div>

        {/* Decorative end element */}
        <div className="flex items-center gap-3 mt-8 justify-end">
          <Heart className="w-4 h-4 text-primary fill-primary/30" />
          <div className="w-8 h-px bg-primary/30" />
        </div>
      </div>
    </section>
  );
};

export default AccountabilitySection;
