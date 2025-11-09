// Backup del App.tsx original
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
  try {
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
  } catch (error) {
    console.error('Error en GameContent:', error);
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', color: 'red' }}>
        <h1>Error en la aplicación</h1>
        <p>{String(error)}</p>
      </div>
    );
  }
}

function App() {
  console.log('App iniciando...');
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;

