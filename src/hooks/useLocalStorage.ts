import { useState,useEffect } from "react"

// Componente foi criado para utilizar o useLocalStorage.
// useLocalStorage Sincroniza o estado com o armazenamento local
// para que ele persista por meio de uma atualização de página
// O uso é semelhante ao useState, exceto que passamos uma chave de armazenamento local
// para que possamos padronizar esse valor no carregamento da página, em vez do valor inicial especificado.

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)

        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === "function") {
            return (initialValue as () => T) ( )
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue ]
}