import React, { createContext, useState, ReactNode, useEffect } from 'react'

interface Todo {
	id: string
	title: string
	completed: boolean
}

interface TodoContextType {
	todos: Todo[]
	addTodo: (title: string) => void
	markAsCompleted: (id: string) => void
	updateTodoTitle: (id: string, title: string) => void
	updateTodoCompleted: (id: string, completed: boolean) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

interface TodoProviderProps {
	children: ReactNode
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		fetchTodos()
	}, [])

	const fetchTodos = async () => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos')
			const todos = await response.json()
			setTodos(todos)
		} catch (error: any) {
			throw new Error(error)
		}
	}

	const addTodo = (title: string) => {
		if (!title.trim()) {
			return
		}
		setTodos([...todos, { id: Date.now().toString(), title, completed: false }])
	}

	const markAsCompleted = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: true } : todo
			)
		)
	}

	const updateTodoTitle = (id: string, title: string) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
	}

	const updateTodoCompleted = (id: string, completed: boolean) => {
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
		)
	}

	return (
		<TodoContext.Provider
			value={{
				todos,
				addTodo,
				markAsCompleted,
				updateTodoTitle,
				updateTodoCompleted,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}
