import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  sidebarOpen: boolean
  theme: "light" | "dark"
  notifications: Array<{
    id: string
    message: string
    type: "success" | "error" | "info" | "warning"
    read: boolean
  }>
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: "light",
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
    addNotification: (
      state,
      action: PayloadAction<{
        id: string
        message: string
        type: "success" | "error" | "info" | "warning"
      }>,
    ) => {
      state.notifications.push({
        ...action.payload,
        read: false,
      })
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer
