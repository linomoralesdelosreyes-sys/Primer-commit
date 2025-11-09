import { GameProvider, useGame } from './context/GameContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AvatarScreen } from './components/AvatarScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SpinningWheel } from './components/SpinningWheel';
import { QuizScreen } from './components/QuizScreen';
import { BibliotecaScreen } from './components/BibliotecaScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

function GameContent() {
  const { screen } = useGame();

  switch (screen) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'avatars':
      return <AvatarScreen />;
    case 'settings':
      return <SettingsScreen />;
    case 'game':
      return <SpinningWheel />;
    case 'quiz':
      return <QuizScreen />;
    case 'biblioteca':
      return <BibliotecaScreen />;
    case 'achievements':
      return <AchievementsScreen />;
    default:
      return <WelcomeScreen />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
