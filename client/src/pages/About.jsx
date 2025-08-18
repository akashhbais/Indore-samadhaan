import { Building2, Users, Trophy, Sparkles, MapPin, Phone, Mail, Star, Award, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: '/rajwada-indore-mp-city-hero.jpeg' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-indore-gold bg-clip-text text-transparent">
            Indore
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            The Commercial Capital of Madhya Pradesh - Where Tradition Meets Innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <span className="inline-flex items-center rounded-md bg-secondary px-6 py-2 text-lg font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
              Cleanest City of India
            </span>
            <span className="inline-flex items-center rounded-md border border-white px-6 py-2 text-lg font-medium text-white hover:bg-white hover:text-foreground transition-colors">
              Smart City Mission
            </span>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center text-indore-orange">
                  <Users className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-indore-orange mb-2">
                  3.5M+
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  Population
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center text-indore-orange">
                  <MapPin className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-indore-orange mb-2">
                  530 km²
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  Area
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center text-indore-orange">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-indore-orange mb-2">
                  #1
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  Cleanest City
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center text-indore-orange">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-indore-orange mb-2">
                  7x
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  Swachh Awards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Indore */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">About Indore</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Indore is the largest and most populous city in Madhya Pradesh, known for its rich heritage, 
              educational institutions, and rapid industrial growth.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Why Indore?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Indore stands as a testament to India's growing urban excellence. From being awarded 
                  the title of India's cleanest city for seven consecutive years to emerging as a major 
                  educational and commercial hub, Indore represents the perfect blend of tradition and modernity.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Founded</h4>
                  <p className="text-muted-foreground">1715 AD</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Elevation</h4>
                  <p className="text-muted-foreground">553 meters</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Language</h4>
                  <p className="text-muted-foreground">Hindi, Marathi</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Climate</h4>
                  <p className="text-muted-foreground">Tropical</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src='' 
                alt="Indore Heritage" 
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Key Achievements</h2>
            <p className="text-xl text-muted-foreground">
              Indore's remarkable journey of transformation and excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br from-indore-orange to-indore-gold text-white border-0 rounded-lg">
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/20">
                    <div className="text-white">
                      <Trophy className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    India's Cleanest City
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="leading-relaxed text-white/90">
                  Awarded the cleanest city title for 7 consecutive years (2017-2023) under Swachh Bharat Mission, setting new standards for urban cleanliness.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src='' 
                  alt="Smart City Mission"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indore-orange/10">
                    <div className="text-indore-orange">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Smart City Mission
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="leading-relaxed text-muted-foreground">
                  Selected as one of the first 20 smart cities in India, implementing innovative urban solutions and digital infrastructure.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indore-orange/10">
                    <div className="text-indore-orange">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Educational Hub
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="leading-relaxed text-muted-foreground">
                  Home to prestigious institutions like IIT Indore, IIM Indore, and numerous other educational establishments attracting students nationwide.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indore-orange/10">
                    <div className="text-indore-orange">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Commercial Capital
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="leading-relaxed text-muted-foreground">
                  Largest commercial center in Madhya Pradesh with thriving textile, pharmaceutical, and IT industries.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src='' 
                  alt="Food Capital"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indore-orange/10">
                    <div className="text-indore-orange">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Food Capital
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="leading-relaxed text-muted-foreground">
                  Renowned for its street food culture and culinary heritage, famous for poha, jalebi, and various local delicacies.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indore-orange/10">
                    <div className="text-indore-orange">
                      <Star className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Cultural Heritage
                  </h3>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="leading-relaxed text-muted-foreground">
                  Rich historical legacy with magnificent palaces, temples, and monuments reflecting the glory of Holkar dynasty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable People */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Notable People</h2>
            <p className="text-xl text-muted-foreground">
              Indore has been home to many distinguished personalities who have made significant contributions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indore-orange to-indore-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    DA
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Devi Ahilya Bai</h3>
                  <p className="text-indore-orange font-medium">Holkar Queen & Ruler</p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  One of the greatest women rulers in Indian history who transformed Indore into a prosperous state.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Achievements:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Built numerous temples and dharamshalas
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Established efficient administration
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Promoted trade and commerce
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indore-orange to-indore-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    UA
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Ustad Allauddin Khan</h3>
                  <p className="text-indore-orange font-medium">Classical Musician</p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Legendary sitar and sarod player, guru to Pandit Ravi Shankar and other renowned musicians.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Achievements:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Padma Bhushan recipient
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Founded Maihar Gharana
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      International recognition in classical music
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indore-orange to-indore-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    LM
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Lata Mangeshkar</h3>
                  <p className="text-indore-orange font-medium">Playback Singer</p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The Nightingale of India, one of the most respected playback singers in Indian cinema.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Achievements:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Bharat Ratna recipient
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Over 30,000 songs recorded
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Multiple National Film Awards
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indore-orange to-indore-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    NH
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Narendra Hirwani</h3>
                  <p className="text-indore-orange font-medium">Cricketer</p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Former Indian cricketer known for his leg-spin bowling, especially his debut Test performance.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Achievements:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      16 wickets in debut Test match
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Played for Indian cricket team
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Domestic cricket achievements
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indore-orange to-indore-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    KK
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Kishore Kumar</h3>
                  <p className="text-indore-orange font-medium">Singer & Actor</p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Versatile playback singer, actor, and filmmaker known for his unique singing style.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Achievements:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Filmfare Best Male Playback Singer
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Acted in numerous films
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Innovative music compositions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indore-orange to-indore-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    SS
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Shankar Dayal Sharma</h3>
                  <p className="text-indore-orange font-medium">9th President of India</p>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Served as the President of India from 1992 to 1997, known for his dedication to education.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Achievements:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      President of India (1992-1997)
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Vice President of India
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-indore-orange font-bold">•</span>
                      Educational reformer
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Initiatives */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Major Initiatives</h2>
            <p className="text-xl text-muted-foreground">
              Transformative projects shaping Indore's future
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="pb-4">
                <h3 className="text-2xl text-foreground flex items-center gap-3 font-semibold">
                  <Trophy className="w-8 h-8 text-indore-orange" />
                  Swachh Bharat Mission
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Indore's remarkable transformation under the Swachh Bharat Mission has made it India's 
                  cleanest city for seven consecutive years, setting new benchmarks for urban sanitation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    100% door-to-door garbage collection
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Effective waste segregation at source
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Scientific waste processing facilities
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Citizen participation programs
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="pb-4">
                <h3 className="text-2xl text-foreground flex items-center gap-3 font-semibold">
                  <Zap className="w-8 h-8 text-indore-blue" />
                  Smart City Development
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  As part of the Smart Cities Mission, Indore is implementing cutting-edge technology 
                  solutions to improve urban governance and citizen services.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-blue font-bold">•</span>
                    Integrated Command and Control Center
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-blue font-bold">•</span>
                    Smart traffic management systems
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-blue font-bold">•</span>
                    Digital governance platforms
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-blue font-bold">•</span>
                    Smart water and energy management
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="pb-4">
                <h3 className="text-2xl text-foreground flex items-center gap-3 font-semibold">
                  <Building2 className="w-8 h-8 text-indore-gold" />
                  Infrastructure Development
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Major infrastructure projects are transforming Indore's connectivity and urban landscape, 
                  supporting rapid economic growth and improving quality of life.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-gold font-bold">•</span>
                    Metro Rail Project development
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-gold font-bold">•</span>
                    Ring Road and bypass construction
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-gold font-bold">•</span>
                    IT parks and business districts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-gold font-bold">•</span>
                    Airport expansion and modernization
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="pb-4">
                <h3 className="text-2xl text-foreground flex items-center gap-3 font-semibold">
                  <Users className="w-8 h-8 text-indore-orange" />
                  Social Welfare Programs
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive social welfare initiatives ensure inclusive development and improve 
                  the quality of life for all citizens, especially the underprivileged sections.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Healthcare accessibility programs
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Skill development initiatives
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Women empowerment schemes
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-indore-orange font-bold">•</span>
                    Education support programs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Tourism */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-8 bg-gradient-to-br from-indore-orange to-indore-gold text-white border-0 rounded-lg">
              <div className="pb-6">
                <h3 className="text-3xl text-white font-semibold">Visit Indore</h3>
              </div>
              <div className="space-y-6">
                <p className="text-white/90 leading-relaxed">
                  Experience the perfect blend of history, culture, and modernity. From magnificent palaces 
                  to bustling markets, from educational institutions to food streets, Indore offers something for everyone.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Must Visit Places:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm text-white/90">• Rajwada Palace</div>
                    <div className="text-sm text-white/90">• Lal Bagh Palace</div>
                    <div className="text-sm text-white/90">• Sarafa Bazaar</div>
                    <div className="text-sm text-white/90">• Chhatri Bagh</div>
                    <div className="text-sm text-white/90">• Kanch Mandir</div>
                    <div className="text-sm text-white/90">• Patalpani Falls</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-indore-cream border border-border/50 rounded-lg">
              <div className="pb-6">
                <h3 className="text-3xl text-foreground font-semibold">Quick Facts</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Best Time to Visit</h4>
                    <p className="text-sm text-muted-foreground">October to March</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Major Festivals</h4>
                    <p className="text-sm text-muted-foreground">Navratri, Diwali, Gudi Padwa</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Transportation</h4>
                    <p className="text-sm text-muted-foreground">Air, Rail, Road connectivity</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Local Transport</h4>
                    <p className="text-sm text-muted-foreground">Bus, Auto, Taxi, Ola/Uber</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-indore-orange" />
                      <span className="text-muted-foreground">Tourism Helpline: +91-755-XXX-XXXX</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-indore-orange" />
                      <span className="text-muted-foreground">tourism@indore.gov.in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indore-orange to-indore-gold bg-clip-text text-transparent">
            Indore
          </h3>
          <p className="text-white/70">
            The Commercial Capital of Madhya Pradesh
          </p>
          <p className="text-sm text-white/50 mt-4">
            © 2024 Indore City. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;