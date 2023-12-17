/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import { NextFunction, Request, Response } from 'express';

/**
 * Local file type
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @type {TLocalFile}
 *
 * @returns {void}
 */
type TLocalFile = (req: Request, res: Response, next: NextFunction) => void;

export default TLocalFile;
