import colors from './colors'

const ThemeColors = {
    primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: colors.primary,
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
        box: `rgba(${colors.box},0.8)`,
        darkbox: `rgba(${colors.darkbox},0.8)`,
        text: `${colors.text}`,
        bordercolor: `${colors.text}`,
        secondary: colors.secondary,
        bdColor: 'rgba(148,160,183,0.64)',
        bdBox: `rgba(${colors.darkbox},1)`,
    },
    amber: {
        400: '#d97706',
    },
}

export default ThemeColors