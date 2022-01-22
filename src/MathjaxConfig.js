/* documentation:
 * https://docs.mathjax.org/en/latest/options/index.html
 */
const MathjaxConfig = {
  tex: {
    macros: {
      d: '\\mathrm{d}',
      R: '\\mathbb{R}',
      Q: '\\mathbb{Q}',
      Z: '\\mathbb{Z}',
      C: '\\mathbb{C}',
      v: '\\bm',
      implies: '\\Rightarrow',
      rref: '\\text{rref}',
      colspace: '\\text{column space}',
      nullspace: '\\text{nullspace}',
      rank: '\\text{rank}',
      nullity: '\\text{nullity}',
      inverse: '^{-1}',
      f: '\\tfrac',
      df: '\\dfrac',
      GE: '\\xrightarrow{\\text{GE}}',
      GJE: '\\xrightarrow{\\text{GJE}}',
    }
  }
}

export default MathjaxConfig
