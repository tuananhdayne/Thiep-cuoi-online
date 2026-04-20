'use client'

import { useEffect } from 'react'

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ====== Chống Click Chuột Phải (Context Menu) ======
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // ====== Chống Phím Tắt Kiểm Tra Mã Nguồn ======
    const handleKeyDown = (e: KeyboardEvent) => {
      // Chống F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault()
      }
      
      // Chống Ctrl+Shift+I / Cmd+Option+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault()
      }
      
      // Chống Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault()
      }

      // Chống Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault()
      }

      // Chống Ctrl+U / Cmd+Option+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault()
      }
      
      // Chống Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
      }

      // Chống Ctrl+Shift+K (Developer Tools Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
      }
    }

    // ====== Chống Drag and Drop (Kéo file) ======
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)

    // Detect if DevTools is open
    let devtools = { open: false, orientation: '' }
    const threshold = 160

    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        if (!devtools.open) {
          devtools.open = true
          console.warn('⚠️ Đừng dùng DevTools!')
        }
      } else {
        devtools.open = false
      }
    }

    const checkDevToolsInterval = setInterval(detectDevTools, 1000)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragover', handleDragOver)
      document.removeEventListener('drop', handleDrop)
      clearInterval(checkDevToolsInterval)
    }
  }, [])

  return <>{children}</>
}
