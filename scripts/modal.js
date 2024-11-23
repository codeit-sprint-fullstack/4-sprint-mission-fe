/**
 * [심화 요구사항]
 *
 * 이벤트가 로드되었을 때 실행되는 함수입니다.
 * 모달을 표시하고, 닫는 기능을 제공합니다.
 */
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("error-modal");
  const modalMessage = document.getElementById("modal-message");
  const confirmButton = document.getElementById("confirm-button");

  /**
   * 모달을 표시하는 함수입니다.
   * <참고: 아래와 같이 JSDoc을 작성하면 이 함수에 대한 설명을 쉽게 확인할 수 있습니다.>
   *
   * JSDoc을 사용하는 이유:
   * 1. 코드 가독성 향상: JSDoc은 함수나 메서드의 목적, 파라미터, 반환값 등에 대한 설명을 제공하여 코드의 가독성을 높입니다.
   * 2. 자동 문서화: JSDoc을 사용하면 자동으로 문서를 생성할 수 있어, 코드와 문서의 일관성을 유지할 수 있습니다.
   * 3. 개발자 간의 의사소통 원활: JSDoc을 통해 협업 시 다른 개발자들이 코드를 더 쉽게 이해하고 사용할 수 있습니다.
   * 4. 코드 유지보수 용이: JSDoc 주석은 코드 변경 시 참고할 수 있는 중요한 정보를 제공하여 유지보수를 쉽게 만듭니다.
   *
   *
   * @param {string} message - 모달에 표시할 메시지
   * @param {string|null} url - 리다이렉트할 URL (기본값: null)
   */
  function showModal(message, url = null) {
    console.log(url);
    modalMessage.textContent = message;
    errorModal.style.display = "block";
    redirectUrl = url;
  }

  /**
   * 모달을 닫는 함수입니다.
   */
  function closeModal() {
    errorModal.style.display = "none";
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  // 확인 버튼에 클릭 이벤트 리스너를 추가합니다.
  confirmButton.addEventListener("click", closeModal);

  // showModal 함수를 전역 스코프에 노출합니다.
  window.showModal = showModal;
  console.log(USER_DATA);
});
