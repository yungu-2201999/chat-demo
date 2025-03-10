import React, { useEffect, useReducer, useState } from 'react'
import styles from './App.module.scss'
import { getTags, getChatGenerate } from "@/api/baseChat"
import { BsCaretLeftSquare, } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { Radio, RadioChangeEvent } from 'antd';
import { flushSync } from 'react-dom';

interface State {
  tags: any[],
  Dialogue: any[]
}
const initialState: State = {
  tags: [],
  Dialogue: []
};
type StateAction =
  | { type: "setTags", value: State["tags"] }
  | { type: "setDialogue", value: State["Dialogue"] }
function stateReducer(state: State, action: StateAction) {
  switch (action.type) {
    case "setTags": {
      const res = { ...state, tags: action.value.map(item => item.model) };
      return res
    }
    case "setDialogue": {
      const res = { ...state, Dialogue: action.value };
      console.log(res)
      return res
    }
    default:
      return state;

  }
}


function App() {

  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [model, setModel] = useState('llama3:latest');
  const [inputTextArea, setInputTextArea] = useState('');
  const [dialogueList, setDialogueList] = useState<{ role: 'user' | 'bot', content: string }[]>([]);

  const changeModel = ({ target: { value } }: RadioChangeEvent) => {
    setModel(value);
  };
  const openChatRoom = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      setDialogueList((dialogueList) => (dialogueList.push({ role: "user", content: inputTextArea }), [...dialogueList]))
      setInputTextArea('')
      const response = await getChatGenerate({ model: model, prompt: inputTextArea, stream: true })
      const reader = response.body!.getReader()
      const decoder = new TextDecoder('utf-8');
      flushSync(() => {
        setDialogueList((dialogueList) => (dialogueList.push({ role: "bot", content: "" }), [...dialogueList]))
      })

      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          break;
        }
        flushSync(() => {
          setDialogueList((dialogueList) => {
            console.log(decoder.decode(value));
            if (decoder.decode(value)) {
              dialogueList[dialogueList.length - 1].content += JSON.parse((decoder.decode(value) || "{}")).response
            }
            return [...dialogueList];
          }
          )
        })
      }
    }

  }




  useEffect(() => {
    let fn = async () => {
      const res = await getTags();
      dispatch({ type: "setTags", value: res.data.models })
      // console.log(state)
      // console.log(res)
    }
    fn();
  }, []);

  return (<>
    <div className={styles.body}>
      <div className={styles.nav}>
        {/* navHeader */}
        <div className={styles.navHeader}>
          <div>
            <BsCaretLeftSquare color="rgba(255,255,255,0.6)" size={38} className={['hover:bg-[rgba(255,255,255,0.2)]', 'p-1', 'hover-border-rd', 'cursor-pointer'].join(' ')} />
          </div>
          <div>
            <AiOutlineEdit color="rgba(255,255,255,0.6)" size={38} className={['hover:bg-[rgba(255,255,255,0.2)]', 'p-1', 'hover-border-rd', 'cursor-pointer'].join(' ')} />
          </div>
        </div>
        <div className={styles.navBorder}>
          <div className={styles.navItem}>新聊天</div>
          <div className={styles.navItem}>新聊天</div>
          <div className={styles.navItem}>新聊天</div>
          <div className={styles.navItem}>新聊天</div>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <div>
            模型:&nbsp;
          </div>
          <div className={styles['model-radio-group']}>
            <Radio.Group
              value={model}
              name="radiogroup"
              className="model-radio-group"
              options={
                state.tags.map(item => ({ value: item, label: item }))
              }
              onChange={changeModel}
            />
          </div>
        </div>
        <div className={styles.mainContent}>
          {dialogueList.length == 0 && <div className={styles.welcomeChat}>
            <h2 className={styles.welTitle}>有什么可以帮忙的？</h2>
            <div className={styles.chatBox}>
              <textarea value={inputTextArea} onChange={({ target: { value } }) => setInputTextArea(value)} onKeyDown={openChatRoom} className={styles.textarea} placeholder="请输入内容" ></textarea>
            </div>
          </div>}
          {dialogueList.length != 0 && <div className={styles.dialogueChat}>
            <div className={styles.dialogueBody}>
              <div className={styles.dialogueContent}>
                {dialogueList.map((item, idx) => ['user'].includes(item.role) ?
                  <div key={idx} className={styles.chatUser}>{item.content}</div> :
                  <div key={idx} className={styles.chatQA}>{item.content}</div>
                )}
              </div>

              <div className={styles.chatBG}>
                <div className={styles.chatBox}>
                  <textarea value={inputTextArea} onChange={({ target: { value } }) => setInputTextArea(value)} onKeyDown={openChatRoom} className={styles.textarea} placeholder="请输入内容" ></textarea>
                </div>
              </div>
            </div>
          </div>}
        </div>

      </main>
    </div>
  </>
  )
}

export default App
