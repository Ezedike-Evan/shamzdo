import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { TodoProvider } from './todoContext'
import TodoListScreen from './TodoListScreen'

export default function App() {
	return (
		<TodoProvider>
			<StatusBar />
			<SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
				<TodoListScreen />
			</SafeAreaView>
		</TodoProvider>
	)
}
