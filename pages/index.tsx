import { useState, useEffect, useCallback } from "react"
import type { NextPage } from "next"
import { Keyboard, WordContent, Score, Timer, Modal } from "components/index"
import style from "styles/Home.module.scss"
import KeysLayout from "utils/keysLayout"
import KeyItem from "components/Key"

const Home: NextPage = () => {
  const [onInputKey, setInputKey] = useState("")
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [scoreCount, setScoreCount] = useState(0)
  const [mistakeCount, setMistakeCount] = useState(0)

  const updateScoreCount = useCallback(() => {
    setScoreCount(scoreCount + 1)
  }, [scoreCount])

  const updateMistakeCount = useCallback(() => {
    setMistakeCount(mistakeCount + 1)
  }, [mistakeCount])

  const openModal = useCallback(() => {
    setIsOpenModal(true)
  }, [setIsOpenModal])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      setInputKey(e.key)
      setTimeout(() => {
        setInputKey("")
      }, 100)
      return
    }

    document.addEventListener("keydown", (e) => handleKeydown(e), false)

    return () => {
      document.removeEventListener("keydown", (e) => handleKeydown(e), false)
    }
  }, [])
  return (
    <>
      <main className={style.main}>
        {/* <Timer openModal={openModal} /> */}
        <Score scoreCount={scoreCount} />
        <WordContent
          onInputKey={onInputKey}
          updateScoreCount={updateScoreCount}
          updateMistakeCount={updateMistakeCount}
          mistakeCount={mistakeCount}
          scoreCount={scoreCount}
        />
        {KeysLayout.keys.map(({ keyLineId, keyItems }) => {
          return (
            <ul key={keyLineId} className={style.keyList}>
              {keyItems.map((key) => {
                return (
                  <li key={key.id}>
                    {key.value === onInputKey ? (
                      <KeyItem value={key.value} onInputKey={onInputKey} />
                    ) : (
                      <KeyItem value={key.value} />
                    )}
                  </li>
                )
              })}
            </ul>
          )
        })}
        {/* <Keyboard onInputKey={onInputKey} /> */}
        <Modal isOpenModal={isOpenModal} />
      </main>
    </>
  )
}

export default Home
