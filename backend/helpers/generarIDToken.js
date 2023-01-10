import crypto from 'crypto'

const generarId = () => crypto.randomUUID().toString(32);
export default generarId;