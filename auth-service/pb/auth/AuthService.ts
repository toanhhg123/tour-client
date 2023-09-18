// Original file: src/protos/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { JwtDecode as _auth_JwtDecode, JwtDecode__Output as _auth_JwtDecode__Output } from '../auth/JwtDecode';
import type { Token as _auth_Token, Token__Output as _auth_Token__Output } from '../auth/Token';

export interface AuthServiceClient extends grpc.Client {
  decode(argument: _auth_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  decode(argument: _auth_Token, callback: grpc.requestCallback<_auth_JwtDecode__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  decode: grpc.handleUnaryCall<_auth_Token__Output, _auth_JwtDecode>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  decode: MethodDefinition<_auth_Token, _auth_JwtDecode, _auth_Token__Output, _auth_JwtDecode__Output>
}
