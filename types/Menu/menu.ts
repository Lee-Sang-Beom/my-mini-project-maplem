/**
 * @MenuType : 메뉴 각 개별이 가지는 요소 정의
 */
export interface MenuType {
    /**
     * @seq : unique key(number)
     * @name : 메뉴명
     * @href : 경로
     * @target : 새 창 열기 여부 
     */
    seq : number;
    name: string;
    href: string;
    target: boolean;
}