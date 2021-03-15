"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeEmailTemplateProvider {
  async parse({
    template
  }) {
    return template;
  }

}

exports.default = FakeEmailTemplateProvider;