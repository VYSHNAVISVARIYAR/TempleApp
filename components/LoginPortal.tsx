import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Flower, Globe, ChevronDown, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

// Language Types
type Language = 'en' | 'ml' | 'ta' | 'te' | 'hi';

// Translations Dictionary
const translations: Record<Language, {
  title: string;
  subtitle: string;
  devotee: string;
  admin: string;
  usernamePlaceholderDevotee: string;
  usernamePlaceholderAdmin: string;
  passwordPlaceholder: string;
  rememberMe: string;
  forgotPassword: string;
  signIn: string;
  processing: string;
  copyright: string;
  privacy: string;
  terms: string;
  contact: string;
  alertLogin: string;
  errorUsernameDevotee: string;
  errorUsernameAdmin: string;
  errorPassword: string;
}> = {
  en: {
    title: "Vettikkattoor",
    subtitle: "Sree Krishna Swamy Temple",
    devotee: "Devotee",
    admin: "Admin",
    usernamePlaceholderDevotee: "Email or Phone",
    usernamePlaceholderAdmin: "Username",
    passwordPlaceholder: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot Password?",
    signIn: "Sign In",
    processing: "Processing...",
    copyright: "Vettikkattoor Devaswom",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    alertLogin: "Logging in...",
    errorUsernameDevotee: "Enter a valid email or 10-digit phone",
    errorUsernameAdmin: "Username must be at least 3 characters",
    errorPassword: "Password must be at least 6 characters"
  },
  ml: {
    title: "വെട്ടിക്കാട്ടൂർ",
    subtitle: "ശ്രീ കൃഷ്ണ സ്വാമി ക്ഷേത്രം",
    devotee: "ഭക്തർ",
    admin: "അഡ്മിൻ",
    usernamePlaceholderDevotee: "ഇമെയിൽ / ഫോൺ",
    usernamePlaceholderAdmin: "യൂസർനെയിം",
    passwordPlaceholder: "പാസ്‌വേഡ്",
    rememberMe: "എന്നെ ഓർമിക്കുക",
    forgotPassword: "പാസ്‌വേഡ് മറന്നോ?",
    signIn: "പ്രവേശിക്കുക",
    processing: "ലോഗിൻ ചെയ്യുന്നു...",
    copyright: "വെട്ടിക്കാട്ടൂർ ദേവസ്വം",
    privacy: "സ്വകാര്യത",
    terms: "വ്യവസ്ഥകൾ",
    contact: "ബന്ധപ്പെടുക",
    alertLogin: "ലോഗിൻ ചെയ്യുന്നു...",
    errorUsernameDevotee: "ശരിയായ ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ നമ്പർ നൽകുക",
    errorUsernameAdmin: "ഉപയോക്തൃനാമം കുറഞ്ഞത് 3 അക്ഷരങ്ങൾ വേണം",
    errorPassword: "പാസ്‌വേഡ് കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ വേണം"
  },
  ta: {
    title: "வெட்டிக்காட்டூர்",
    subtitle: "ஸ்ரீ கிருஷ்ண சுவாமி கோவில்",
    devotee: "பக்தர்",
    admin: "நிர்வாகி",
    usernamePlaceholderDevotee: "மின்னஞ்சல் / தொலைபேசி",
    usernamePlaceholderAdmin: "பயனர்பெயர்",
    passwordPlaceholder: "கடவுச்சொல்",
    rememberMe: "என்னை நினைவில் கொள்",
    forgotPassword: "கடவுச்சொல்லை மறந்தீர்களா?",
    signIn: "உள்நுழைக",
    processing: "உள்நுழைகிறது...",
    copyright: "வெட்டிக்காட்டூர் தேவஸ்வம்",
    privacy: "தனியுரிமை",
    terms: "விதிமுறைகள்",
    contact: "தொடர்புக்கு",
    alertLogin: "உள்நுழைகிறது...",
    errorUsernameDevotee: "சரியான மின்னஞ்சல்/தொலைபேசி எண்ணை உள்ளிடவும்",
    errorUsernameAdmin: "பயனர்பெயர் குறைந்தது 3 எழுத்துக்கள் இருக்க வேண்டும்",
    errorPassword: "கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்"
  },
  te: {
    title: "వెట్టిక్కాట్టూర్",
    subtitle: "శ్రీ కృష్ణ స్వామి ఆలయం",
    devotee: "భక్తుడు",
    admin: "అడ్మిన్",
    usernamePlaceholderDevotee: "ఇమెయిల్ / ఫోన్",
    usernamePlaceholderAdmin: "యూజర్ పేరు",
    passwordPlaceholder: "పాస్వర్డ్",
    rememberMe: "నన్ను గుర్తుంచుకో",
    forgotPassword: "పాస్వర్డ్ మర్చిపోయారా?",
    signIn: "సైన్ ఇన్",
    processing: "లాగిన్ అవుతోంది...",
    copyright: "వెట్టిక్కాట్టూర్ దేవస్వం",
    privacy: "గోప్యత",
    terms: "నియమాలు",
    contact: "సంప్రదించండి",
    alertLogin: "లాగిన్ అవుతోంది...",
    errorUsernameDevotee: "సరైన ఇమెయిల్ లేదా ఫోన్ నంబర్‌ను నమోదు చేయండి",
    errorUsernameAdmin: "వినియోగదారు పేరు కనీసం 3 అక్షరాలు ఉండాలి",
    errorPassword: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి"
  },
  hi: {
    title: "वेट्टिक्काट्टूर",
    subtitle: "श्री कृष्ण स्वामी मंदिर",
    devotee: "भक्त",
    admin: "एडमिन",
    usernamePlaceholderDevotee: "ईमेल / फोन",
    usernamePlaceholderAdmin: "उपयोगकर्ता नाम",
    passwordPlaceholder: "पासवर्ड",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    signIn: "साइन इन",
    processing: "लॉगिन कर रहा है...",
    copyright: "वेट्टिक्काट्टूर देवस्वम",
    privacy: "गोपनीयता",
    terms: "शर्तें",
    contact: "संपर्क करें",
    alertLogin: "लॉगिन कर रहा है...",
    errorUsernameDevotee: "मान्य ईमेल या फोन नंबर दर्ज करें",
    errorUsernameAdmin: "उपयोगकर्ता नाम कम से कम 3 अक्षर होना चाहिए",
    errorPassword: "पासवर्ड कम से कम 6 अक्षर होना चाहिए"
  }
};

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'en', label: 'English', native: 'English' },
];

export const LoginPortal: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.DEVOTEE);
  const [lang, setLang] = useState<Language>('ml');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Validation State
  const [touched, setTouched] = useState({ username: false, password: false });

  // Translation Helper
  const t = translations[lang];

  // Background Image URL
  const bgImage = "temple-bg.jpg"; 

  // Reset inputs and validation state when role changes
  useEffect(() => {
    setUsername('');
    setPassword('');
    setTouched({ username: false, password: false });
  }, [role]);

  // Validation Logic
  const checkUsernameValid = (val: string, currentRole: UserRole) => {
    if (!val) return false;
    if (currentRole === UserRole.ADMIN) {
      return val.length >= 3;
    }
    // Devotee: Email or 10-12 digit Phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,12}$/;
    return emailRegex.test(val) || phoneRegex.test(val);
  };

  const isUsernameValid = checkUsernameValid(username, role);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isUsernameValid && isPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert(t.alertLogin);
    }, 1500);
  };

  const handleBlur = (field: 'username' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image - Fixed position with bg-fixed to ensure coverage */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      
      {/* Gradient Overlay - Darker at bottom, lighter at top (visually balanced) */}
      <div className="fixed inset-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-black/40 backdrop-blur-[2px]" />

      {/* Glassmorphism Card */}
      <div className="relative z-20 w-full max-w-md p-8 mx-4 transition-all duration-300 transform rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        
        {/* Language Switcher */}
        <div className="absolute top-4 right-4 z-30">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 border border-white/10 text-white/90 text-xs font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{languages.find(l => l.code === lang)?.native}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white shadow-xl py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      lang === l.code 
                        ? 'bg-saffron-50 text-saffron-600 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {l.native}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Backdrop to close menu */}
          {isLangMenuOpen && (
            <div 
              className="fixed inset-0 z-[-1]" 
              onClick={() => setIsLangMenuOpen(false)} 
            />
          )}
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 text-center mt-2">
          {/* Logo Placeholder */}
          <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-700 shadow-lg border border-white/20">
             <Flower className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md mb-1 tracking-wide">
            {t.title}
          </h1>
          <h2 className="text-lg md:text-xl font-serif text-gray-200 tracking-wider font-light">
            {t.subtitle}
          </h2>
          {/* Decorative Divider */}
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-6 opacity-80" />
        </div>

        {/* Role Toggle - Pill Shape */}
        <div className="flex p-1 mb-8 rounded-full bg-black/30 border border-white/10 mx-auto w-full max-w-xs relative">
          <button
            onClick={() => setRole(UserRole.DEVOTEE)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              role === UserRole.DEVOTEE
                ? 'bg-white text-peacock-900 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {t.devotee}
          </button>
          <button
            onClick={() => setRole(UserRole.ADMIN)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              role === UserRole.ADMIN
                ? 'bg-white text-saffron-700 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {t.admin}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            {/* Username Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className={`h-5 w-5 transition-colors ${
                  touched.username && !isUsernameValid ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-gold-400'
                }`} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
                className={`block w-full pl-11 pr-4 py-3 bg-black/30 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-200 backdrop-blur-sm ${
                  touched.username && !isUsernameValid 
                    ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/50' 
                    : 'border-white/20 focus:border-gold-500/80 focus:ring-gold-500/50'
                }`}
                placeholder={role === UserRole.ADMIN ? t.usernamePlaceholderAdmin : t.usernamePlaceholderDevotee}
                required
              />
              {touched.username && !isUsernameValid && (
                <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-rose-300 text-xs animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{role === UserRole.ADMIN ? t.errorUsernameAdmin : t.errorUsernameDevotee}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 transition-colors ${
                  touched.password && !isPasswordValid ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-gold-400'
                }`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                className={`block w-full pl-11 pr-12 py-3 bg-black/30 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-200 backdrop-blur-sm ${
                  touched.password && !isPasswordValid 
                    ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/50' 
                    : 'border-white/20 focus:border-gold-500/80 focus:ring-gold-500/50'
                }`}
                placeholder={t.passwordPlaceholder}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {touched.password && !isPasswordValid && (
                <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-rose-300 text-xs animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{t.errorPassword}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm pt-2">
            <label className="flex items-center text-gray-200 hover:text-white cursor-pointer select-none transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-white/30 bg-white/10 checked:bg-gold-500 checked:border-gold-500 focus:ring-0 focus:ring-offset-0 mr-2 transition-colors" />
              <span>{t.rememberMe}</span>
            </label>
            <a href="#" className="text-gold-400 hover:text-gold-300 hover:underline transition-colors font-medium">
              {t.forgotPassword}
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-lg tracking-wide shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-saffron-500 ${
              !isFormValid || isLoading
                ? 'bg-gray-600/50 cursor-not-allowed opacity-70 grayscale'
                : 'bg-gradient-to-r from-saffron-500 to-saffron-700 hover:scale-[1.02] hover:shadow-saffron-500/20 hover:brightness-110'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.processing}
              </span>
            ) : (
              t.signIn
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} {t.copyright}
          </p>
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
            <a href="#" className="hover:text-gold-400 transition-colors">{t.privacy}</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400 transition-colors">{t.terms}</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400 transition-colors">{t.contact}</a>
          </div>
        </div>
      </div>
    </div>
  );
};