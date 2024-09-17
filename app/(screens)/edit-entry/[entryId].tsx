import Button from '@/components/ui/Button'
import ThemedScreen from '@/components/ui/ThemedScreen'
import ThemedTextInput from '@/components/ui/ThemedTextInput'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native'

function EditEntry() {
  const local = useLocalSearchParams()
  const [reps, setReps] = useState("")

  const entry = useQuery(api.logged_reps.getEntry, {
    entryId: local.entryId as string
  })
  const updateMutation = useMutation(api.logged_reps.update)
  const removeMutation = useMutation(api.logged_reps.remove)

  useEffect(() => {
    if(entry) {
      setReps(entry.reps.toString())
    }
  }, [entry])


  async function onSavePressed() {
    await updateMutation({
      entryId: local.entryId as string,
      reps: Number(reps)
    })
    router.back()
  }

  function onDeletePressed() {
    Alert.alert('Confirm', 'Are you sure you want to delete this entry?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onConfirmDeletePressed,
        style: 'destructive'
      },
    ]);
  }

  async function onConfirmDeletePressed() {
    router.back()
    await removeMutation({ entryId: local.entryId as string })
  }

  return (
    <ThemedScreen>
      <Text>Reps</Text>
      <ThemedTextInput
        keyboardType="numeric"
        value={reps}
        onChangeText={val => setReps(val)} />
      <Button onPress={onSavePressed}>
        <Text>Save</Text>
      </Button>
      <Button onPress={onDeletePressed}>
        <Text>Delete</Text>
      </Button>
    </ThemedScreen>
  )
}

export default EditEntry