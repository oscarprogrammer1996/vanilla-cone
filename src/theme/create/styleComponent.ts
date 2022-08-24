import { createElement, ElementType, ReactNode } from 'react';
import { RuntimeFn } from '@vanilla-extract/recipes/dist/declarations/src/types';
import classNames from 'classnames';

export const styleComponent = <S extends (...args: any) => any>(
    sprinklesFn: S,
    componentType: ElementType,
    children: ReactNode,
    props: Object,
    defaultStyle?: Parameters<S>[0] | string,
    variantFn?: RuntimeFn<{}>
) => {
    const { sprinklesProps, elementProps, variantProps } = extractParams(
        sprinklesFn,
        typeof defaultStyle !== 'string'
            ? {
                  ...props,
                  ...defaultStyle
              }
            : props
    );
    const { className, ...restProps } = elementProps;

    return createElement(
        componentType,
        {
            className: classNames([
                className,
                sprinklesFn(sprinklesProps),
                variantFn ? variantFn(variantProps) : '',
                typeof defaultStyle === 'string' ? defaultStyle : ''
            ]),
            ...restProps
        },
        children
    );
};

import { RecordProps } from 'theme/create/types';

const getSprinklesParams = (sprinkles: Record<string, any>) => {
    const sprinklesParams: string[] = [];

    sprinkles['properties'].forEach((value: string) => {
        sprinklesParams.push(value);
    });
    return sprinklesParams;
};

const extractParams = <S extends (...args: any) => any>(
    sprinkles: S,
    props: Object
) => {
    const Props = props as Record<string, unknown>;
    const sprinklesParams = getSprinklesParams(sprinkles);
    const sprinklesProps: RecordProps = {};
    const elementProps: RecordProps = {};
    let variantProps: RecordProps = {};

    Object.keys(props).forEach((key) => {
        if (sprinklesParams.includes(key)) {
            sprinklesProps[key] = Props[key];
        } else if (key === 'variant') {
            variantProps = Props[key] as RecordProps;
        } else {
            elementProps[key] = Props[key];
        }
    });

    return { sprinklesProps, elementProps, variantProps };
};
