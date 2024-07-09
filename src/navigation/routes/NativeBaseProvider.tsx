import React from 'react';
import { extendTheme, NativeBaseProvider as Provider } from 'native-base';
import colors from '../../application/styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import ThemeColors from '../../application/styles/ThemeColors';
const NativeBaseProvider = ({ children }: { children: React.ReactNode }) => {
    const config = {
        dependencies: {
          'linear-gradient': LinearGradient
        }
      };
    
      const theme = extendTheme({
        colors: ThemeColors,
        fontConfig: {
          Avenir: {
            400: {
              normal: 'avenir-medium'
            },
            600: {
              normal: 'avenir-demi'
            },
            700: {
              normal: 'avenir-bold'
            },
          }
        },
        fonts: {
          heading: 'Avenir',
          body: 'Avenir',
          mono: 'Avenir',
        },
        components: {
          Heading: {
            defaultProps: { fontSize: '2xl', fontWeight: '600', color: 'primary.text' },
          },
          Text: {
            defaultProps: { fontSize: 'md', fontWeight: '400', color: 'primary.text' },
          },
          Button: {
            defaultProps: {
              size: 'lg', bg: 'primary.500',
              _hover: { bg: colors.primary },
              _text: { color: 'primary.text' },
              _pressed: { bg: `${colors.secondary}` }
            }
          },
          Input: {
            defaultProps: {
              fontSize: 'md',
              bg: 'primary.darkbox',
              borderColor: 'primary.darkbox',
              _focus: {
                borderColor: `rgb(${colors.darkbox})`,
              },
            },
            baseStyle: {
              _light: {
                placeholderTextColor: colors.text,
              },
              _dark: {
                placeholderTextColor: colors.text
              },
            },
          }
        },
        config: {
          initialColorMode: 'dark',
        },
      });
    return (   
        <Provider config={config} theme={theme}>
            {children}
        </Provider>
    );
};

export default NativeBaseProvider;