/**
 * 位置
 */
class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  rotate = (theta: number) => {
    const x = this.x
    const y = this.y
    this.x = Math.cos(theta) * x - Math.sin(theta) * y
    this.y = Math.sin(theta) * x + Math.cos(theta) * y
    return this
  }

  mult = (f: number) => {
    this.x *= f
    this.y *= f
    return this
  }

  clone = () => {
    return new Vector(this.x, this.y)
  }

  length = () => {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  subtract = (v: { x: number; y: number }) => {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  set = (x: number, y: number) => {
    this.x = x
    this.y = y
    return this
  }
}

/**
 * 花瓣
 */
class Petal {
  stretchA: number
  stretchB: number
  startAngle: number
  angle: number
  bloom: Bloom
  growFactor: number
  r: number
  isfinished: boolean
  // tanAngleA: number
  // tanAngleB: number
  constructor(
    stretchA: number,
    stretchB: number,
    startAngle: number,
    angle: number,
    growFactor: number,
    bloom: Bloom
  ) {
    this.stretchA = stretchA
    this.stretchB = stretchB
    this.startAngle = startAngle
    this.angle = angle
    this.bloom = bloom
    this.growFactor = growFactor
    this.r = 1
    this.isfinished = false
    // this.tanAngleA = Garden.random(
    //   -Garden.degrad(Garden.options.tanAngle),
    //   Garden.degrad(Garden.options.tanAngle)
    // )
    // this.tanAngleB = Garden.random(
    //   -Garden.degrad(Garden.options.tanAngle),
    //   Garden.degrad(Garden.options.tanAngle)
    // )
  }

  draw = () => {
    const ctx = this.bloom.garden.ctx
    const v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle))
    const v2 = v1.clone().rotate(Garden.degrad(this.angle))
    const v3 = v1.clone().mult(this.stretchA) // rotate(this.tanAngleA)
    const v4 = v2.clone().mult(this.stretchB) // rotate(this.tanAngleB)
    ctx.strokeStyle = this.bloom.c
    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y)
    ctx.stroke()
  }

  render = () => {
    if (this.r <= this.bloom.r) {
      this.r += this.growFactor // / 10;
      this.draw()
    } else {
      this.isfinished = true
    }
  }
}

/**
 * 开花
 */
class Bloom {
  p: Vector
  r: number
  c: string
  pc: number
  petals: Petal[]
  garden: Garden
  constructor(p: Vector, r: number, c: string, pc: number, garden: Garden) {
    this.p = p
    this.r = r
    this.c = c
    this.pc = pc
    this.petals = []
    this.garden = garden
    this.init()
    this.garden.addBloom(this)
  }

  draw = () => {
    let p,
      isfinished = 1
    this.garden.ctx.save()
    this.garden.ctx.translate(this.p.x, this.p.y)
    for (let i = 0; i < this.petals.length; i++) {
      p = this.petals[i]
      p.render()
      isfinished *= p.isfinished ? 1 : 0
    }
    this.garden.ctx.restore()
    if (isfinished === 1) {
      this.garden.removeBloom(this)
    }
  }

  init = () => {
    const angle = 360 / this.pc
    const startAngle = Garden.randomInt(0, 90)
    for (let i = 0; i < this.pc; i++) {
      this.petals.push(
        new Petal(
          Garden.random(
            Garden.options.petalStretch.min,
            Garden.options.petalStretch.max
          ),
          Garden.random(
            Garden.options.petalStretch.min,
            Garden.options.petalStretch.max
          ),
          startAngle + i * angle,
          angle,
          Garden.random(
            Garden.options.growFactor.min,
            Garden.options.growFactor.max
          ),
          this
        )
      )
    }
  }
}

/**
 * 花园
 */
export class Garden {
  blooms: Bloom[]
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, element: HTMLCanvasElement) {
    this.blooms = []
    this.element = element
    this.ctx = ctx
  }

  render = () => {
    for (let i = 0; i < this.blooms.length; i++) {
      this.blooms[i].draw()
    }
  }

  addBloom = (b: Bloom) => {
    this.blooms.push(b)
  }

  removeBloom = (b: Bloom) => {
    let bloom
    for (let i = 0; i < this.blooms.length; i++) {
      bloom = this.blooms[i]
      if (bloom === b) {
        this.blooms.splice(i, 1)
        return this
      }
    }
  }

  createRandomBloom = (x: number, y: number) => {
    this.createBloom(
      x,
      y,
      Garden.randomInt(
        Garden.options.bloomRadius.min,
        Garden.options.bloomRadius.max
      ),
      Garden.randomrgba(
        Garden.options.color.rmin,
        Garden.options.color.rmax,
        Garden.options.color.gmin,
        Garden.options.color.gmax,
        Garden.options.color.bmin,
        Garden.options.color.bmax,
        Garden.options.color.opacity
      ),
      Garden.randomInt(
        Garden.options.petalCount.min,
        Garden.options.petalCount.max
      )
    )
  }

  createBloom = (x: number, y: number, r: number, c: string, pc: number) => {
    new Bloom(new Vector(x, y), r, c, pc, this)
  }

  clear = () => {
    this.blooms = []
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
  }

  static options = {
    petalCount: {
      min: 8,
      max: 15,
    },
    petalStretch: {
      min: 0.1,
      max: 3,
    },
    growFactor: {
      min: 0.1,
      max: 1,
    },
    bloomRadius: {
      min: 8,
      max: 10,
    },
    density: 10,
    growSpeed: 1000 / 60,
    color: {
      rmin: 128,
      rmax: 255,
      gmin: 0,
      gmax: 128,
      bmin: 0,
      bmax: 128,
      opacity: 0.1,
    },
    tanAngle: 60,
  }

  static random = function (min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  static randomInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static circle = 2 * Math.PI
  static degrad = function (angle: number) {
    return (Garden.circle / 360) * angle
  }
  static raddeg = function (angle: number) {
    return (angle / Garden.circle) * 360
  }

  static rgba = function (r: number, g: number, b: number, a: number) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
  }

  static randomrgba = function (
    rmin: number,
    rmax: number,
    gmin: number,
    gmax: number,
    bmin: number,
    bmax: number,
    a: number
  ) {
    const r = Math.round(Garden.random(rmin, rmax))
    const g = Math.round(Garden.random(gmin, gmax))
    const b = Math.round(Garden.random(bmin, bmax))
    const limit = 5
    if (
      Math.abs(r - g) <= limit &&
      Math.abs(g - b) <= limit &&
      Math.abs(b - r) <= limit
    ) {
      return Garden.rgba(rmin, rmax, gmin, gmax)
    } else {
      return Garden.rgba(r, g, b, a)
    }
  }
}
