import { recipe } from '@vanilla-extract/recipes';
import { vars } from 'theme/theme.css';
import { style } from '@vanilla-extract/css';

export const buttonVariants = recipe({
    base: {
        color: '#000000',
        padding: '0.5rem 2rem',
        borderRadius: '0.2rem',
        fontSize: '1rem'
    },
    variants: {
        style: {
            primary: {
                backgroundColor: vars.color['error.200'],
                boxShadow: '0 0 1rem #ff0000',
                ':hover': {
                    backgroundColor: 'rgba(255,0,0,0.50)',
                    color: '#ffffff'
                }
            },
            secondary: {
                backgroundColor: '#0032ff',
                boxShadow: '0 0 1rem #0032ff',
                ':hover': {
                    backgroundColor: 'rgba(0,50,255,0.5)',
                    color: '#ffffff'
                }
            }
        },
        color: {
            red: {
                color: 'red'
            },
            blue: {
                color: 'blue'
            }
        }
    },
    defaultVariants: {
        style: 'primary'
    }
});

export const buttonStyle = style({
    padding: '1rem 3rem',
    backgroundColor: 'blue',
    ':hover': {
        backgroundColor: 'indianred'
    }
});
