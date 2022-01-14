var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()


class Graph {
    constructor() {
        // this.numberOfNodes = 0;
        this.adjacent = {};
    }

    get numberOfNodes() {
        return Object.keys(this.adjacent).length
    }

    addVertex(node) {
        if (node === undefined) {
            throw TypeError("Value is required for addVertex");
        }
        if (!this.adjacent[node]) {
            this.adjacent[node] = new Set();
        }
    }

    addEdge(node1, node2) {
        if (node1 === undefined ||  node2 === undefined){
            throw TypeError("Two values required for addEdge")
        }
        this.adjacent[node1].add(node2);
        this.adjacent[node2].add(node1);
    }

}

describe('Graph', () => {
    context('Creation', () => {

        it('should have a numberOfNodes property === 0', () => {
            expect(new Graph().numberOfNodes).to.equal(0);
        });

        it('should have a adjacent property that is instance of Object', () => {
            expect(new Graph().adjacent).is.instanceOf(Object);
        });

        it('should have an empty adjacent property', () => {
            let adjacent_size = Object.keys(new Graph().adjacent).length;
            expect(adjacent_size).is.equal(0)
        });

    });

    context('addVertex', () => {
        beforeEach(() => {
            this.graph = new Graph();
        })

        it('should throw a TypeError if no value passed', () => {
            expect(() => {this.graph.addVertex()}).to.throw(TypeError, "Value is required for addVertex");
        })

        it('should increment numberOfNodes', () => {
            this.graph.addVertex(2);
            expect(this.graph.numberOfNodes).to.equal(1);
            this.graph.addVertex(3);
            expect(this.graph.numberOfNodes).to.equal(2);
            this.graph.addVertex(4);
            expect(this.graph.numberOfNodes).to.equal(3);
        })

        it('should not increment numberOfNodes if node already added', () => {
            this.graph.addVertex(2);
            expect(this.graph.numberOfNodes).to.equal(1);
            this.graph.addVertex(2);
            expect(this.graph.numberOfNodes).to.equal(1);
            this.graph.addVertex(3);
            expect(this.graph.numberOfNodes).to.equal(2);
            this.graph.addVertex(2);
            expect(this.graph.numberOfNodes).to.equal(2);
        })

        it('should not overwrite adjacent list if node already exists', () => {
            this.graph.addVertex(3);
            let expected = new Set([1, 2, 3]);
            this.graph.adjacent[3] = expected;
            this.graph.addVertex(3);
            expect(this.graph.adjacent[3]).to.equal(expected);
        })

        it('should accept 0 as a valid node', () => {
            this.graph.addVertex(0);
            expect(this.graph.numberOfNodes).to.equal(1);
        })

    })

    context('addEdge', () => {
        beforeEach(() => {
            this.graph = new Graph();
            for (let i=0; i < 7; i++) {
                let num = i.toString();
                this.graph.addVertex(num);
            }
        })

        it('should throw a TypeError if no values passed', () => {
            expect(() => {this.graph.addEdge()}).to.throw(TypeError, "Two values required for addEdge")
        })

        it('should throw a TypeError if only 1 value passed', () => {
            expect(() => {this.graph.addEdge(1)}).to.throw(TypeError, "Two values required for addEdge")
        })

        it('should add 1st node to adjacent list of 2nd node', () => {
            this.graph.addEdge(1, 2);
            expect(this.graph.adjacent[1]).to.contain(2);
            expect(this.graph.adjacent[1].size).to.equal(1);
        })

        it('should add 2nd node to adjacent list of 1st node', () => {
            this.graph.addEdge(1, 2);
            expect(this.graph.adjacent[2]).to.contain(1);
            expect(this.graph.adjacent[2].size).to.equal(1);
        })

        it('should accept 0 as a valid node1', () => {
            this.graph.addEdge(0, 2)
            expect(this.graph.adjacent[0]).to.contain(2)
            expect(this.graph.adjacent[0].size).to.equal(1)
        })

        it('should accept 0 as a valid node2', () => {
            this.graph.addEdge(2, 0);
            expect(this.graph.adjacent[2]).to.contain(0);
            expect(this.graph.adjacent[2].size).to.equal(1);
        })

        it('should be able to add multiple adjacent nodes', () => {
            this.graph.addEdge(1, 2);
            this.graph.addEdge(1, 3);
            expect(this.graph.adjacent[1]).to.contain(2);
            expect(this.graph.adjacent[1]).to.contain(3);
            expect(this.graph.adjacent[1].size).to.equal(2);
        })

        it('should not duplicate nodes in the adjacent list', () => {
            this.graph.addEdge(1, 2);
            this.graph.addEdge(1, 2);
            expect(this.graph.adjacent[1].size).to.equal(1);
        })

        it('should create a multi node tree', () => {
            let edges = [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [2, 4], [4, 5], [5, 6]]
            for (let i=0; i<edges.length; i++) {
                let [node1, node2] = edges[i];
                this.graph.addEdge(node1, node2);
            }

            let expected_adjacency = JSON.stringify({
                0: new Set([1, 2]),
                1: new Set([0, 2, 3]),
                2: new Set([0, 1, 4]),
                3: new Set([1, 4]),
                4: new Set([2, 3, 5]),
                5: new Set([4, 6]),
                6: new Set([5]),
            })
            let actual_adjacency = JSON.stringify(this.graph.adjacent);
            expect(actual_adjacency).to.equal(expected_adjacency);
        })
    })

});


mocha.run()