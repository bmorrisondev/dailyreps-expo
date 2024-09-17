'use client'
import { ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  children: ReactNode
  onPress: () => void
}

function ListItem({ children, onPress }: Props) {
  return (
    <Pressable
      style={styles.pressable}
      onPress={onPress}
    >
      <View style={styles.inner}>
        <View style={styles.inner2}>
          { children }
        </View>
        <Ionicons size={22} name='chevron-forward' style={styles.icon} />
      </View>
    </Pressable>
  )
}

export default ListItem

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 6,
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    color: "#111",
    fontSize: 14,
    fontWeight: "bold"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  inner2: {
    display: "flex",
    gap: 3,
    flexDirection: "column",
    flex: 1
  },
  icon: {
    color: "#aaa"
  }
})