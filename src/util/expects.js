import { expect } from 'chai';

export const deepEqually = (data, eq) => expect(data).to.be.eql(eq);
export const equally = (data, eq) => expect(data).to.be.eql(eq);
export const calledWith = (stub, ...rest) => expect(stub).to.have.been.calledWith(...rest);
export const calledOnce = (stub) => expect(stub).to.have.been.calledOnce;
export const exists = (data) => expect(data).to.exist;
