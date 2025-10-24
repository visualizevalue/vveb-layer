declare module 'opepen-standard' {
  /**
   * Options for generating an opepen icon
   */
  export interface OpepenOptions {
    /**
     * The size of the icon in pixels
     * @default 8
     */
    size?: number

    /**
     * A string seed to generate the icon deterministically
     * If not provided, a random seed will be generated
     */
    seed?: string

    /**
     * The scale factor for rendering the icon
     * @default 4
     */
    scale?: number

    /**
     * The foreground color of the icon
     * If not provided, a random color will be generated
     */
    color?: string

    /**
     * The background color of the icon
     * If not provided, a random color will be generated
     */
    bgcolor?: string

    /**
     * The spot color used for specific pattern elements
     * If not provided, a random color will be generated
     */
    spotcolor?: string
  }

  /**
   * Renders an opepen icon to the provided canvas
   * @param opts - Options for generating the icon
   * @param canvas - The canvas element to render to
   * @returns The canvas element with the rendered icon
   */
  export function renderIcon(
    opts: OpepenOptions | undefined,
    canvas: HTMLCanvasElement,
  ): HTMLCanvasElement

  /**
   * Creates a new canvas element and renders an opepen icon to it
   * @param opts - Options for generating the icon
   * @returns A new canvas element with the rendered icon
   */
  export function createIcon(opts: OpepenOptions | undefined): HTMLCanvasElement
}
