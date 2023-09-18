// Original file: src/protos/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UserId as _user_UserId, UserId__Output as _user_UserId__Output } from '../user/UserId';
import type { UserResponse as _user_UserResponse, UserResponse__Output as _user_UserResponse__Output } from '../user/UserResponse';

export interface UserServiceClient extends grpc.Client {
  FindUserById(argument: _user_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  FindUserById(argument: _user_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  FindUserById(argument: _user_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  FindUserById(argument: _user_UserId, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  findUserById(argument: _user_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  findUserById(argument: _user_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  findUserById(argument: _user_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  findUserById(argument: _user_UserId, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  FindUserById: grpc.handleUnaryCall<_user_UserId__Output, _user_UserResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  FindUserById: MethodDefinition<_user_UserId, _user_UserResponse, _user_UserId__Output, _user_UserResponse__Output>
}
