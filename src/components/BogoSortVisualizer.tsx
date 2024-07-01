import React, { useCallback, useEffect, useState } from 'react'
import '../styles/bogoSortVisualizer.css'

interface BogoSortState {
  items: number[]
  sorted: boolean
  itemCount: number
  sorting: boolean
}

const isSorted = (arr: number[]): boolean => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false
    }
  }
  return true
}

const shuffle = (arr: number[]): number[] => {
  let count = arr.length,
    temp,
    index
  while (count > 0) {
    index = Math.floor(Math.random() * count)
    count--

    temp = arr[count]
    arr[count] = arr[index]
    arr[index] = temp
  }

  return arr
}

const generateRandomSizes = (count: number): number[] => {
  const sizes: number[] = []
  for (let i = 1; i <= count; i++) {
    sizes.push((100 / count) * i)
  }
  return sizes.reverse()
}

const BogoSortVisualizer: React.FC = () => {
  const [state, setState] = useState<BogoSortState>({
    items: [],
    sorted: false,
    itemCount: 10,
    sorting: false,
  })

  const reset = useCallback(() => {
    const randomSizes = generateRandomSizes(state.itemCount)
    setState({
      items: randomSizes,
      sorted: false,
      itemCount: state.itemCount,
      sorting: false,
    })
  }, [state.itemCount])

  useEffect(() => {
    reset()
    bogoSort()
  }, [state.itemCount, reset])

  useEffect(() => {
    if (!state.sorted && state.sorting) {
      const sortInterval = setInterval(() => {
        const copy = [...state.items]
        shuffle(copy)
        setState((prevState) => ({
          ...prevState,
          items: copy,
        }))
        if (isSorted(copy)) {
          setState((prevState) => ({
            ...prevState,
            sorted: true,
          }))
          clearInterval(sortInterval)
        }
      }, 50)

      return () => clearInterval(sortInterval)
    }
  }, [state.items, state.sorted, state.sorting])

  useEffect(() => {
    if (state.sorted) {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          itemCount: prevState.itemCount + 1,
          sorted: false,
          sorting: true,
        }))
      }, 1000)
    }
  }, [state.sorted])

  const bogoSort = () => {
    setState((prevState) => ({
      ...prevState,
      sorting: true,
    }))
  }

  return (
    <main className="bogo-sort-visualizer">
      <h2 className="bogo-counter">Current block count: {state.itemCount}</h2>
      <ul className="sort-container">
        {state.items.map((size, index) => (
          <li
            key={index}
            className="sort-container-element"
            style={{ height: `${size}%` }}
          />
        ))}
      </ul>
      {state.sorted && <p>Sorted!</p>}
    </main>
  )
}

export default BogoSortVisualizer
