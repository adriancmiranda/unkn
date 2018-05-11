import {foo, bar} from 'foo';
import { foo, bar, baz} from "foo";
import { foo, bar, baz } from 'foo';
import { _TEST_, _, EXPORT } from 'foo';
import { _TEST_, _, EXPORT as $test } from 'foo';
import { a as A, _, b as B, c as C, test, EXPORT as $test } from 'foo/bar';
import { _, b as B, c as C, test, EXPORT as $test } from 'foo/bar/baz';
