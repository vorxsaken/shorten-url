import { useContext, createContext, ReactNode, useReducer } from "react";
import { theme, reducer } from "./context";

const ThemeContext = createContext<any>([]);
export const UseThemeContext = () => useContext(ThemeContext);

export default function StateProvider({ children }: {children: ReactNode}) {
    return (
        <ThemeContext.Provider value={useReducer(reducer, theme)}>
            {children}
        </ThemeContext.Provider>
    )
}