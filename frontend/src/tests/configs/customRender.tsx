import { getQueryClient } from '@libs/reactQuery/client';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  type RenderHookOptions,
  type RenderOptions,
  type RenderResult,
  render,
  renderHook,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  act,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  Suspense,
} from 'react';
const WrapperComponent = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options: RenderOptions = {},
): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => <WrapperComponent>{children}</WrapperComponent>,
    ...options,
  });

function customRenderHook<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
) {
  return renderHook(callback, {
    wrapper: props => (
      <WrapperComponent {...options?.initialProps}>
        {(props as { children: ReactNode }).children}
      </WrapperComponent>
    ),

    ...options,
  });
}

export function componentRenderer<Props>(
  C: ComponentType<Props>,
  defaultProps: Props = {} as Props & { children?: ReactNode },
  options?: RenderOptions,
): (props?: Partial<Props>, overrideOptions?: RenderOptions) => RenderResult {
  const renderComponent = (props?: Partial<Props>) => (
    <C
      {...defaultProps}
      {...props}
    />
  );
  return (props?: Partial<Props>, overrideOptions?: RenderOptions) =>
    customRender(renderComponent(props), {
      ...options,
      ...overrideOptions,
    });
}

type TAsyncComponent<Props> = (props: Props) => Promise<ReactNode>;

export function createCustomAsyncComponentRenderer<Props>(
  AsyncComponent: TAsyncComponent<Props>,
  defaultProps?: Props,
  options?: RenderOptions,
) {
  return async (props?: Partial<Props>, overrideOptions?: RenderOptions) => {
    const baseProps = defaultProps ?? ({} as Props);
    const resolvedComponent = await AsyncComponent({
      ...baseProps,
      ...props,
    } as Props);

    return await act(async () =>
      customRender(
        <Suspense fallback="loading...">{resolvedComponent}</Suspense>,
        {
          ...options,
          ...overrideOptions,
        },
      ),
    );
  };
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, customRenderHook as renderHook };
export { userEvent };
