import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function SettingsButtons() {
    return (
        <div className="fixed top-4 right-4 flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
        </div>
    );
} 