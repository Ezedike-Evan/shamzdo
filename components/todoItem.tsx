import React, { useState, useContext, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	TextInput,
	Switch,
} from 'react-native'
import { TodoContext } from '../todoContext'

interface Todo {
	id: string
	title: string
	completed: boolean
}

interface TodoItemProps {
	item: Todo
	markAsCompleted: (id: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ item, markAsCompleted }) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editTitle, setEditTitle] = useState(item.title)
	const [editCompleted, setEditCompleted] = useState(item.completed)

	const { updateTodoTitle, updateTodoCompleted } = useContext(TodoContext) as {
		updateTodoTitle: (id: string, title: string) => void
		updateTodoCompleted: (id: string, completed: boolean) => void
	}

	useEffect(() => {
		item.completed ? setEditCompleted(true) : setEditCompleted(false)
	}, [item.completed])

	const handleEdit = () => {
		updateTodoTitle(item.id, editTitle)
		updateTodoCompleted(item.id, editCompleted)
		setIsEditing(false)
		setModalVisible(false)
	}
	return (
		<View
			style={{
				padding: 12,
				backgroundColor: '#fff',
				borderRadius: 8,
				marginBottom: 8,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Text
				style={{
					fontSize: 16,
					textDecorationLine: item.completed ? 'line-through' : 'none',
					color: item.completed ? '#888' : '#000',
				}}
			>
				{item.title}
			</Text>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					onPress={() => markAsCompleted(item.id)}
					style={{
						backgroundColor: item.completed ? 'gray' : '#28a745',
						padding: 8,
						borderRadius: 8,
						marginRight: 8,
						zIndex: 6,
					}}
					disabled={item.completed}
				>
					<Text style={{ color: '#fff' }}>✔</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setModalVisible(true)}
					style={{ backgroundColor: '#6c757d', padding: 8, borderRadius: 8 }}
				>
					<Text style={{ color: '#fff' }}>🔍</Text>
				</TouchableOpacity>
			</View>
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<View
						style={[
							styles.modalContent,
							isEditing ? { height: '30%' } : { height: '100%' },
						]}
					>
						{!isEditing ? (
							<>
								<Text style={styles.modalTitle}>Todo Task</Text>
								<Text
									style={{ fontSize: 16, fontWeight: '700', marginBottom: 1 }}
								>
									Title
								</Text>
								<Text style={{ fontSize: 25, fontWeight: '500' }}>
									{item.title}
								</Text>
								<Text
									style={{
										fontSize: 16,
										fontWeight: '700',
										marginBottom: 1,
										marginTop: 15,
									}}
								>
									is Completed
								</Text>
								<Text style={{ fontSize: 25, fontWeight: '500' }}>
									{item.completed ? 'Yes' : 'No'}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										gap: 10,
										justifyContent: 'space-evenly',
									}}
								>
									<TouchableOpacity
										onPress={() => setIsEditing(true)}
										style={{
											paddingVertical: 10,
											paddingHorizontal: 30,
											backgroundColor: '#007bff',
											borderRadius: 10,
										}}
									>
										<Text
											style={{ color: '#fff', fontSize: 21, fontWeight: '700' }}
										>
											Edit
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => setModalVisible(false)}
										style={{
											paddingVertical: 10,
											paddingHorizontal: 30,
											backgroundColor: 'gray',
											borderRadius: 10,
										}}
									>
										<Text
											style={{ color: '#fff', fontSize: 21, fontWeight: '700' }}
										>
											Close
										</Text>
									</TouchableOpacity>
								</View>
							</>
						) : (
							<>
								<Text style={styles.modalTitle}>Edit Todo Task</Text>
								<Text
									style={{ fontSize: 16, fontWeight: '700', marginBottom: 1 }}
								>
									Title
								</Text>
								<TextInput
									style={styles.input}
									value={editTitle}
									onChange={(e) => setEditTitle(e.nativeEvent.text)}
									placeholder="Enter new title"
								/>
								<Text
									style={{ fontSize: 16, fontWeight: '700', marginBottom: 1 }}
								>
									is Completed
								</Text>
								<Switch
									style={{ alignSelf: 'flex-start' }}
									value={editCompleted}
									onValueChange={() => setEditCompleted((prev) => !prev)}
									trackColor={{ true: '#28a745', false: 'gray' }}
									thumbColor={editCompleted ? '#28a745' : 'gray'}
								/>
								<View
									style={{
										flexDirection: 'row',
										gap: 10,
										justifyContent: 'space-evenly',
									}}
								>
									<TouchableOpacity
										onPress={handleEdit}
										style={{
											paddingVertical: 10,
											paddingHorizontal: 30,
											backgroundColor: '#007bff',
											borderRadius: 10,
										}}
									>
										<Text
											style={{ color: '#fff', fontSize: 21, fontWeight: '700' }}
										>
											Save
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											setModalVisible(false)
											setIsEditing(false)
										}}
										style={{
											paddingVertical: 10,
											paddingHorizontal: 30,
											backgroundColor: 'gray',
											borderRadius: 10,
										}}
									>
										<Text
											style={{ color: '#fff', fontSize: 21, fontWeight: '700' }}
										>
											Close
										</Text>
									</TouchableOpacity>
								</View>
							</>
						)}
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default TodoItem

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		width: '100%',
		backgroundColor: 'white',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
	},
})
