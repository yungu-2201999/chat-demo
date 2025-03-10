import request from "../utils/request";
import type { GenerateData } from './baseChatTypes.d.ts'

export const getChatList = (params?: any) => {
  return request.get('/chat/list', { params });
};


export const getTags = () => {
  return request.get('/api/tags')
}


export const getChatGenerate = (data: GenerateData) => {
  return fetch('/api/generate',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
