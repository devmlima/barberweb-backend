"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePDFS3 = exports.AWS = void 0;
const AWSSDK = __importStar(require("aws-sdk"));
AWSSDK.config.region = 'us-east-1';
exports.AWS = AWSSDK;
const savePDFS3 = (buffer, type, name, bucket) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://barberweb.s3.amazonaws.com/${name}`;
    const s3 = new exports.AWS.S3(createConnectionString());
    const data = {
        Bucket: bucket,
        Key: name,
        Body: buffer,
    };
    yield s3.putObject(data).promise();
    return yield getBucketFileSignedUrl({ Bucket: data.Bucket, Key: data.Key, Expires: 10 }, s3);
});
exports.savePDFS3 = savePDFS3;
const getBucketFileSignedUrl = (awsS3Model, s3) => __awaiter(void 0, void 0, void 0, function* () {
    let fileUrl = '';
    try {
        fileUrl = yield s3.getSignedUrlPromise('getObject', awsS3Model);
    }
    catch (ex) {
        console.log(ex);
    }
    return fileUrl;
});
const createConnectionString = () => {
    return {
        region: process.env.region,
        accessKeyId: process.env.access_key_id,
        secretAccessKey: process.env.secret_access_key,
    };
};
//# sourceMappingURL=aws.js.map