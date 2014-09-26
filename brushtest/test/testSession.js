/*global describe, it, before, after*/
var assert = require('assert');
var request = require('supertest');
var async = require('async');
var config = require('./configTest.js')();
var num = require('num');
var debug = require('debug')('testSession')
var SnowBot = require('./snow-bot');
var SnowChef = require('./snow-chef');

describe('Session', function () {
    "use strict";
    
    var user_config = {
            "url" : config.url,
            "email" : "aa",
            "password" : "password"
    }
    
    describe('Session', function () {
        it('SessionEmailOk', function(done) {
            user_config.email = "aaaaaaa";
            var client = new (require('../../client/index'))(user_config);
            client.securitySession()
            .then(function(sessionKey) {
                assert(sessionKey)
                done()
            })
            .fail(done)
        });
        it('SessionEmailTooShort', function(done) {
            user_config.email = "aa";
            var client = new (require('../../client/index'))(user_config);
            client.securitySession()
            .fail(function(err) {
                assert(err)
                done()
            });
        });
        it('SessionEmailTooLong', function(done) {
            user_config.email = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
            var client = new (require('../../client/index'))(user_config);
            client.securitySession()
            .fail(function(err) {
                assert(err)
                done()
            });
        });
    });
});