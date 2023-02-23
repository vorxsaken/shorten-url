const theme = {
    dark: false
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                dark: action.dark
            }
    }
}

export { theme, reducer};

