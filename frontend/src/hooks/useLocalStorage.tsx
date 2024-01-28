
import { useEffect } from 'react'
import { useState } from 'react'

const PREFIX = 'linkedin-clone-'

const useLocalStorage = (key:any,initailValue:any) => {
    const prefixedKey = PREFIX + key
    const [ value,setValue] = useState(()=> {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initailValue === 'function'){
            return initailValue()
        }else{
            return initailValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value, setValue]
}

export default useLocalStorage