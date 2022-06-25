import React, { useState } from 'react'
import ThemeContext from './ThemeContext';

function ThemeState(props) {
    // Default Theme
    const [theme, setTheme] = useState({backgroundColor: "white", color: "black", mode: "light"});
    
    // Function to update theme
    const updateTheme = () => {
        if(theme.mode === 'dark') {
            setTheme({backgroundColor: "white", color: "black", mode: "light"});
        } else {
            setTheme({backgroundColor: "#15202B", color: "white", mode: "dark"});
        }
    }

//{{theme: theme, updatTheme: updateTheme}}
    return (
        <ThemeContext.Provider value={{theme, updateTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState