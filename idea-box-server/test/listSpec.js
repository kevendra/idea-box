 'use strict';

 var request = require('supertest');
 var app = require('../app');
 var chai = require('chai');
 var expect = chai.expect;
 var sinon = require('sinon');
 var dependency = require('../api/dependency');
 var treeStructure = require('../api/idea/generateTreeStructure');
 var _ = require('lodash');
 var mock = require('./mockData/mock');

 var sandbox;

 describe('**************Test*************', function() {


     beforeEach(function() {
         sandbox = sinon.sandbox.create();
     });

     afterEach(function() {
         sandbox.restore();
     });

     it('should throw a 500 if data access causes an exception', function(done) {
         var Idea = dependency.getIdeaModel();
         sandbox.stub(Idea, 'find', function(query) {
             expect(query).to.deep.equal({
                 category: 'test'
             });

             return {
                 'sort': function(sortQuery) {
                     expect(sortQuery).to.deep.equal('-createdOn');
                     return {
                         'lean': function() {
                             return {
                                 'exec': function(callback) {
                                     callback('error');
                                 }
                             };
                         }
                     }
                 }
             };
         });

         request(app)
             .get('/api/idea/idea-list.json?category=test')
             .expect(500)
             .end(function(err, res) {
                 if (err) {
                     done(err);
                 } else {
                     done();
                 }
             });
     });


     it('should return the idea list....', function(done) {
         var treeStructure = require('../api/idea/generateTreeStructure');
         var mockIdeaList
         var Idea = dependency.getIdeaModel();

         sandbox.stub(Idea, 'find', function(query) {
             expect(query).to.deep.equal({
                 category: 'test'
             });

             return {
                 'sort': function(sortQuery) {
                     expect(sortQuery).to.deep.equal('-createdOn');
                     return {
                         'lean': function() {
                             return {
                                 'exec': function(callback) {

                                     callback(undefined, []);
                                 }
                             };
                         }
                     }
                 }
             };
         });

         sinon.stub(treeStructure, 'addParentIdIfMissing', function() {});

         sinon.stub(treeStructure, 'unflatten', function() {
             return mock.mockIdeas;
         });


         request(app)
             .get('/api/idea/idea-list.json?category=test')
             .expect(200)
             .end(function(err, res) {
                 if (err) {
                     done(err);
                 } else {
                     expect(res.body).to.deep.equal({
                         "status": "SUCCESS",
                         "data": {
                             ideaList: [{
                                     'name': 'Idea1'
                                 }, {
                                     'name': 'Idea2'
                                 }, {
                                     'name': 'Idea3'
                                 }, {
                                     'name': 'Idea4'
                                 }

                             ]
                         },
                         "error": null
                     });

                     done();
                 }
             });

     });


 });
