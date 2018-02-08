import { Injectable } from '@angular/core';


@Injectable()
export class VertPositionService {

	setPositionIfOffPage(parentElementRect, childElementSize: number): number {
		const windowHeight = window.innerHeight;
		const parentElementTop = parentElementRect.top;
		const parentElementBottom = parentElementRect.bottom;
		const offPage = parentElementBottom + childElementSize > windowHeight;
		return offPage ? parentElementTop - childElementSize : parentElementBottom;
	}
}
