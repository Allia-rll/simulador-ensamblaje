class UniformDistribution {
  constructor(public low: number, public high: number) {}
  public generate = (an: number) => {
    return an * (this.low - this.high) + this.low;
  };
}

class ErlangDistribution {
  constructor(public k: number, public lambda: number) {}
  generate = (an: number[] | null) => {
    let product = 1;
    if (!an) {
      an = [];
      for (let i = 0; i < this.k; i++) {
        an.push(Math.random());
      }
    }
    for (let rn of an) {
      product *= 1 - rn;
    }
    return -Math.log(product) / (this.k * this.lambda);
  };
}

const uniSingleton = () => {
  return new UniformDistribution(45, 55);
};

const erlangSingleton = () => {
  return new ErlangDistribution(4, 1/30);
};

declare global {
  var uniform: ReturnType<typeof uniSingleton> | undefined;
  var erlang: ReturnType<typeof erlangSingleton> | undefined;
}

export const uni = global.uniform ?? uniSingleton();
export const erlang = global.erlang ?? erlangSingleton();
