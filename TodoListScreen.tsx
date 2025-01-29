import React, { useContext, useState } from 'react'
import {
	View,
	TextInput,
	FlatList,
	TouchableOpacity,
	Text,
	StatusBar,
	SafeAreaView,
} from 'react-native'
import { TodoContext } from './todoContext'
import TodoItem from './components/todoItem'

// Define the Todo interface (same as in context)
interface Todo {
	id: string
	title: string
	completed: boolean
}

const TodoListScreen: React.FC = () => {
	const { todos, addTodo, markAsCompleted } = useContext(TodoContext) as {
		todos: Todo[]
		addTodo: (title: string) => void
		markAsCompleted: (id: string) => void
	}

	const [newTodo, setNewTodo] = useState<string>('')

	return (
		<SafeAreaView
			style={{ paddingVertical: 26, paddingHorizontal: 25, marginTop: 50 }}
		>
			<StatusBar />
			<View style={{ flexDirection: 'row', marginBottom: 16, gap: 25 }}>
				<TextInput
					style={{
						flex: 1,
						borderWidth: 1,
						borderColor: '#fff',
						padding: 8,
						borderRadius: 8,
						fontSize: 23,
						color: '#fff',
					}}
					placeholder="Add new todo..."
					placeholderTextColor={'gray'}
					value={newTodo}
					onChangeText={setNewTodo}
				/>
				<TouchableOpacity
					onPress={() => {
						addTodo(newTodo)
						setNewTodo('')
					}}
					style={{
						backgroundColor: '#007bff',
						padding: 10,
						borderRadius: 8,
					}}
				>
					<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>
						Add
					</Text>
				</TouchableOpacity>
			</View>
			<Text
				style={{
					color: '#fff',
					fontSize: 24,
					letterSpacing: 2,
					marginBottom: 5,
				}}
			>
				Task List
			</Text>
			<FlatList
				data={todos}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TodoItem
						item={item}
						markAsCompleted={markAsCompleted}
					/>
				)}
			/>
		</SafeAreaView>
	)
}

export default TodoListScreen
